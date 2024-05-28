"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRecordSet = exports.getResorceRecordSet = exports.getAllHostedList = exports.awsInstance = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const crypto_1 = require("crypto");
const user_model_1 = __importDefault(require("../models/user-model"));
const user_controller_1 = require("./user-controller");
const common_dnsmanager_1 = require("@vinaydevs/common-dnsmanager");
const awsInstance = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch user from database
        const user = yield user_model_1.default.findOne({ _id: userId });
        if (!user) {
            throw "User Not Found";
        }
        // Decrypt credentials
        const accessKey = (0, user_controller_1.decrypt)(user.accessKey);
        const secretKey = (0, user_controller_1.decrypt)(user.secretKey);
        // Update AWS configuration
        aws_sdk_1.default.config.update({
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
            region: 'us-east-1'
        });
        const route53 = new aws_sdk_1.default.Route53();
        try {
            const ans = yield route53.listHostedZones().promise();
            return true;
        }
        catch (error) {
            return false;
        }
    }
    catch (error) {
        console.error('Error in awsInstance function:', error);
        return false;
    }
});
exports.awsInstance = awsInstance;
const getAllHostedList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get aws cache or
    try {
        const userId = req.userId;
        const conn = yield (0, exports.awsInstance)(userId).then((ans) => { return ans; });
        if (!conn) {
            return res.status(401).json({
                message: 'AWS Connection Failed. Check The Credentials'
            });
        }
        const route53 = new aws_sdk_1.default.Route53();
        yield route53.listHostedZones((err, ans) => {
            if (ans) {
                return res.json(ans);
            }
            else {
                return res.status(401).json({
                    err
                });
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllHostedList = getAllHostedList;
const getResorceRecordSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const conn = yield (0, exports.awsInstance)(userId);
        if (!conn) {
            return res.status(401).json({
                message: 'AWS Connection Failed. Check The Credentials'
            });
        }
        const route53 = new aws_sdk_1.default.Route53();
        const HostedZoneId = req.params.hostedzoneId;
        yield route53.listResourceRecordSets({ HostedZoneId: HostedZoneId }, (err, ans) => {
            if (ans) {
                const resourceSetWithId = ans.ResourceRecordSets.map((resource) => {
                    return Object.assign(Object.assign({}, resource), { id: (0, crypto_1.randomUUID)() });
                });
                return res.json(resourceSetWithId);
            }
            else {
                return res.json(err);
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getResorceRecordSet = getResorceRecordSet;
function createRecordSet(route53, hostedZoneId, recordSet) {
    //Name,Values,TTL,Type
    return new Promise((resolve, reject) => {
        console.log("HEY");
        const { success } = common_dnsmanager_1.route53RecordSchema.safeParse(recordSet);
        if (!success) {
            reject("Invalid Record Set");
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
            }
            else {
                resolve(data);
            }
        });
    });
}
function updateRecordSet(route53, hostedZoneId, recordSet) {
    return new Promise((resolve, reject) => {
        const { success } = common_dnsmanager_1.route53RecordSchema.safeParse(recordSet);
        if (!success) {
            reject("Invalid Record Set");
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
            }
            else {
                resolve(data);
            }
        });
    });
}
function deleteRecordSet(route53, hostedZoneId, recordSet) {
    return new Promise((resolve, reject) => {
        console.log(hostedZoneId, recordSet);
        const { success } = common_dnsmanager_1.route53RecordSchema.safeParse(recordSet);
        if (!success) {
            console.log("hey");
            reject("Invalid Record Set");
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
            }
            else {
                resolve(data);
            }
        });
    });
}
const postRecordSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const conn = yield (0, exports.awsInstance)(userId);
        if (!conn) {
            return res.status(401).json({
                message: 'AWS Connection Failed. Check The Credentials'
            });
        }
        const route53 = new aws_sdk_1.default.Route53();
        const body = req.body;
        console.log(JSON.stringify(body));
        const { success, error } = common_dnsmanager_1.recordSetBodySchema.safeParse(body);
        if (!success) {
            return res.status(402).json({
                message: "Invalid Record Set",
                error: error
            });
        }
        const { operation, recordSet, hostedZoneId } = body;
        //get cache aws 
        switch (operation) {
            case 'create':
                try {
                    yield createRecordSet(route53, hostedZoneId, recordSet);
                    res.json({
                        message: "Record Set Created "
                    });
                }
                catch (error) {
                    res.status(500).json({
                        message: "Error While Creating Record Set"
                    });
                }
                break;
            case 'update':
                try {
                    yield updateRecordSet(route53, hostedZoneId, recordSet);
                    res.json({
                        message: "Record Set Updated "
                    });
                }
                catch (error) {
                    res.status(500).json({
                        message: "Error While Updating Record Set"
                    });
                }
                break;
            case 'delete':
                try {
                    yield deleteRecordSet(route53, hostedZoneId, recordSet);
                    res.json({
                        message: "Record Set Deleted "
                    });
                }
                catch (error) {
                    res.status(500).json({
                        message: "Error While Deleteing Record Set"
                    });
                }
                break;
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.postRecordSet = postRecordSet;
