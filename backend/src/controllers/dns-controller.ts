import AWS from 'aws-sdk'
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import User from '../models/user-model';
import { decrypt } from './user-controller';
import { RecordSetBody, recordSetBodySchema, Route53Record, route53RecordSchema } from '@vinaydevs/common-dnsmanager'

interface requestWithUserId extends Request {
    userId: string;
}

export const awsInstance = async (userId: string) => {
    try {
        // Fetch user from database
        const user = await User.findOne({ _id: userId });
        if (!user) {
            throw "User Not Found";
        }

        // Decrypt credentials
        const accessKey = decrypt(user.accessKey);
        const secretKey = decrypt(user.secretKey);


        // Update AWS configuration
        AWS.config.update({
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
            region: 'us-east-1'
        });

        const route53 = new AWS.Route53();

        try {
            const ans = await route53.listHostedZones().promise()
            return true;
        } catch (error) {
            return false
        }



    } catch (error) {
        console.error('Error in awsInstance function:', error);
        return false;
    }
};

export const getAllHostedList = async (req: Request, res: Response) => {
    //get aws cache or
    try {
        const userId = (req as unknown as requestWithUserId).userId
        const conn = await awsInstance(userId).then((ans) => { return ans });
        if (!conn) {
            return res.status(401).json({
                message: 'AWS Connection Failed. Check The Credentials'
            })
        }
        const route53 = new AWS.Route53()


        await route53.listHostedZones((err, ans) => {
            if (ans) {
                return res.json(ans)
            } else {
                return res.status(401).json({
                    err
                })
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const getResorceRecordSet = async (req: Request, res: Response) => {
    try {
        const userId = (req as unknown as requestWithUserId).userId

        const conn = await awsInstance(userId);
        if (!conn) {
            return res.status(401).json({
                message: 'AWS Connection Failed. Check The Credentials'
            })
        }
        const route53 = new AWS.Route53()

        const HostedZoneId = req.params.hostedzoneId;

        await route53.listResourceRecordSets({ HostedZoneId: HostedZoneId }, (err, ans) => {
            if (ans) {
                const resourceSetWithId = ans.ResourceRecordSets.map((resource) => {
                    return { ...resource, id: randomUUID() }
                })
                return res.json(resourceSetWithId);
            } else {
                return res.json(err);
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

}
function createRecordSet(route53: AWS.Route53, hostedZoneId: string, recordSet: Route53Record) {
    //Name,Values,TTL,Type

    return new Promise((resolve, reject) => {
        console.log("HEY")
        const { success } = route53RecordSchema.safeParse(recordSet)
        if (!success) {
            reject("Invalid Record Set")
        }
        const params = {

            ChangeBatch: {
                Comment: "CREATE A RECORD",
                Changes: [
                    {
                        Action: 'CREATE',
                        ResourceRecordSet: {
                            Name: recordSet.Name,
                            ResourceRecords: recordSet.ResourceRecords,
                            TTL: 300,
                            Type: recordSet.Type,
                        },

                    }
                ]
            },
            HostedZoneId: hostedZoneId
        };

        route53.changeResourceRecordSets(params, (err, data) => {
            if (err) {
                // console.log(err?.InvalidChangeBatch)
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
function updateRecordSet(route53: AWS.Route53, hostedZoneId: string, recordSet: Route53Record) {
    return new Promise((resolve, reject) => {
        const { success } = route53RecordSchema.safeParse(recordSet)
        if (!success) {
            reject("Invalid Record Set")
        }
        const params = {
            ChangeBatch: {
                Changes: [
                    {
                        Action: 'UPSERT',
                        ResourceRecordSet: {
                            Name: recordSet.Name,
                            ResourceRecords: recordSet.ResourceRecords,
                            TTL: 300,
                            Type: recordSet.Type,
                        },
                    }
                ]
            },
            HostedZoneId: hostedZoneId
        };

        route53.changeResourceRecordSets(params, (err, data) => {
            if (err) {

                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
function deleteRecordSet(route53: AWS.Route53, hostedZoneId: string, recordSet: Route53Record) {
    return new Promise((resolve, reject) => {
        console.log(hostedZoneId, recordSet)
        const { success } = route53RecordSchema.safeParse(recordSet)
        if (!success) {
            console.log("hey")
            reject("Invalid Record Set")
        }
        const params = {
            ChangeBatch: {
                Changes: [
                    {
                        Action: 'DELETE',
                        ResourceRecordSet: {
                            Name: recordSet.Name,
                            ResourceRecords: recordSet.ResourceRecords,
                            TTL: recordSet.TTL,
                            Type: recordSet.Type,
                        },
                    }
                ]
            },
            HostedZoneId: hostedZoneId
        };

        route53.changeResourceRecordSets(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}


export const postRecordSet = async (req: Request, res: Response) => {
    try {
        const userId = (req as unknown as requestWithUserId).userId

        const conn = await awsInstance(userId);
        if (!conn) {
            return res.status(401).json({
                message: 'AWS Connection Failed. Check The Credentials'
            })
        }
        const route53 = new AWS.Route53()


        const body: RecordSetBody = req.body;
        console.log(JSON.stringify(body))
        const { success, error } = recordSetBodySchema.safeParse(body);
        if (!success) {
            return res.status(402).json({
                message: "Invalid Record Set",
                error: error

            })
        }
        const { operation, recordSet, hostedZoneId }: RecordSetBody = body;
        //get cache aws 

        switch (operation) {
            case 'create':
                try {

                    await createRecordSet(route53, hostedZoneId, recordSet);
                    res.json({
                        message: "Record Set Created "
                    })
                } catch (error) {
                    res.status(500).json({
                        message: "Error While Creating Record Set"
                    })
                }
                break;
            case 'update':
                try {
                    await updateRecordSet(route53, hostedZoneId, recordSet);
                    res.json({
                        message: "Record Set Updated "
                    })
                } catch (error) {
                    res.status(500).json({
                        message: "Error While Updating Record Set"
                    })
                }
                break;
            case 'delete':
                try {
                    await deleteRecordSet(route53, hostedZoneId, recordSet);
                    res.json({
                        message: "Record Set Deleted "
                    })
                } catch (error) {
                    res.status(500).json({
                        message: "Error While Deleteing Record Set"
                    })
                }
                break;
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

}


