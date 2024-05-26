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
    //check the cache , if not then grap the details from db and make instance
    try {
        const user = await User.findOne({
            _id: userId
        })
        if (!user) {
            return
        }
        const accessKey = decrypt(user.accessKey)
        const secretKey = decrypt(user.secretKey)
        console.log(accessKey, "secretKey")
        AWS.config.update({
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
            region: 'us-east-1'
        });
        console.log(AWS.config)
        try {
            const route53 = new AWS.Route53()
            return route53;
        } catch (error) {
            return
        }

    } catch (error) {
        return
    }
}

export const getAllHostedList = async (req: Request, res: Response) => {
    //get aws cache or
    try {
        const userId = (req as unknown as requestWithUserId).userId

        const route53 = await awsInstance(userId);

        if (!route53) {
            return res.json({
                message: "AWS Connection Failed. Check The Credentials"
            })
        }
        await route53.listHostedZones((err, ans) => {

            if (ans) {
                return res.json(ans)
            } else {
                return res.json({
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
        const route53 = await awsInstance(userId)
        const HostedZoneId = req.params.hostedzoneId;
        if (!route53) {
            return res.json({
                message: "AWS Connection Failed. Check The Credentials"
            })
        }
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
                console.log(err)
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
function deleteRecordSet(route53: AWS.Route53, hostedZoneId: string, recordSet: Route53Record) {
    return new Promise((resolve, reject) => {
        const { success } = route53RecordSchema.safeParse(recordSet)
        if (!success) {
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
        const route53 = await awsInstance(userId)
        if (!route53) {
            return res.json({
                message: "AWS Connection Failed. Check The Credentials"
            })
        }
        const body: RecordSetBody = req.body;
        const { success, error } = recordSetBodySchema.safeParse(body);
        if (!success) {
            return res.json({
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
                    res.json({
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
                    res.json({
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
                    res.json({
                        message: "Error While Deleteing Record Set"
                    })
                }
                break;
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

}


