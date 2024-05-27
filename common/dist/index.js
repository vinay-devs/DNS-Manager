"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordSetBodySchema = exports.credentialsSchema = exports.signinSchema = exports.signupSchema = exports.route53RecordSchema = exports.recordSchemaCheck = void 0;
const zod_1 = require("zod");
const recordSchema_1 = require("./recordSchema");
// Define the validation schema for Route53 record types
exports.recordSchemaCheck = recordSchema_1.recordSchema;
exports.route53RecordSchema = zod_1.z.object({
    Name: zod_1.z.string().min(1, 'Name should not be empty'),
    Type: zod_1.z.enum(["A", "AAAA", "CNAME", "MX", "NS", "PTR", "SOA", "SPF", "SRV", "TXT"]),
    ResourceRecords: zod_1.z.array(zod_1.z.object({
        Value: zod_1.z.string()
    })).optional(),
    TTL: zod_1.z.number().optional(),
}).superRefine((data, ctx) => {
    const { Type, ResourceRecords } = data;
    ResourceRecords === null || ResourceRecords === void 0 ? void 0 : ResourceRecords.forEach((resourceRecord) => {
        const valueToCheck = resourceRecord.Value;
        const { success } = recordSchema_1.recordSchema.safeParse({ type: Type, value: valueToCheck });
        if (!success) {
            return ctx.addIssue({ code: zod_1.z.ZodIssueCode.custom, message: `Invalid record ${Type} and Value combination` });
        }
    });
});
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().max(20, 'Name should not be more than 20 characters').min(1, 'Name should not be empty'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password should be atleast 6 characters')
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password should be atleast 6 characters')
});
exports.credentialsSchema = zod_1.z.object({
    credentials: zod_1.z.object({
        accessKey: zod_1.z.string().min(16, 'Access key should be atleast 16 characters'),
        secretKey: zod_1.z.string().min(16, 'Secret key should be atleast 16 characters'),
    })
});
exports.recordSetBodySchema = zod_1.z.object({
    operation: zod_1.z.enum(['create', 'update', 'delete']),
    recordSet: exports.route53RecordSchema,
    hostedZoneId: zod_1.z.string().max(32, 'HostedZone Id should be atleast 32 characters')
});
