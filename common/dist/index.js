"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordSetBodySchema = exports.hostedZoneId = exports.credentialsSchema = exports.signinSchema = exports.signupSchema = exports.route53RecordSchema = void 0;
const zod_1 = require("zod");
const recordSchema_1 = require("./recordSchema");
// Define the validation schema for Route53 record types
exports.route53RecordSchema = zod_1.z.object({
    Name: zod_1.z.string(),
    Type: zod_1.z.enum(["A", "AAAA", "CNAME", "MX", "NS", "PTR", "SOA", "SPF", "SRV", "TXT"]),
    ResourceRecords: zod_1.z.array(zod_1.z.object({
        Value: zod_1.z.string()
    })),
    TTL: zod_1.z.number().optional(),
}).superRefine((data, ctx) => {
    const { Type, ResourceRecords } = data;
    ResourceRecords.forEach((resourceRecord) => {
        const valueToCheck = resourceRecord.Value;
        const { success } = recordSchema_1.recordSchema.safeParse({ type: Type, value: valueToCheck });
        if (!success) {
            return ctx.addIssue({ code: zod_1.z.ZodIssueCode.custom, message: `Invalid record ${Type} and Value combination` });
        }
    });
});
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
exports.credentialsSchema = zod_1.z.object({
    credentials: zod_1.z.object({
        accessKey: zod_1.z.string(),
        secretKey: zod_1.z.string(),
        region: zod_1.z.string()
    })
});
exports.hostedZoneId = zod_1.z.string();
exports.recordSetBodySchema = zod_1.z.object({
    operation: zod_1.z.enum(['create', 'update', 'delete']),
    recordSet: exports.route53RecordSchema,
    hostedZoneId: zod_1.z.string()
});
