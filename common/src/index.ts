import { z } from "zod";
import { recordSchema } from "./recordSchema";

// Define the validation schema for Route53 record types
export const recordSchemaCheck = recordSchema
export const route53RecordSchema = z.object({
    Name: z.string().min(1, 'Name should not be empty'),
    Type: z.enum(["A", "AAAA", "CNAME", "MX", "NS", "PTR", "SOA", "SPF", "SRV", "TXT"]),
    ResourceRecords: z.array(z.object({
        Value: z.string()
    })).optional(),
    TTL: z.number().optional(),
}).superRefine((data, ctx) => {
    const { Type, ResourceRecords } = data;
    ResourceRecords?.forEach((resourceRecord) => {
        const valueToCheck = resourceRecord.Value;
        const { success } = recordSchema.safeParse({ type: Type, value: valueToCheck })
        if (!success) {
            return ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Invalid record ${Type} and Value combination` });
        }
    })
});

export type Route53Record = z.infer<typeof route53RecordSchema>;

export const signupSchema = z.object({
    name: z.string().max(20, 'Name should not be more than 20 characters').min(1, 'Name should not be empty'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password should be atleast 6 characters')
});

export type Signup = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password should be atleast 6 characters')
});

export type Signin = z.infer<typeof signinSchema>;

export const credentialsSchema = z.object({
    accessKey: z.string().min(16, 'Access key should be atleast 16 characters'),
    secretKey: z.string().min(16, 'Secret key should be atleast 16 characters'),
});

export type Credentials = z.infer<typeof credentialsSchema>;

export const recordSetBodySchema = z.object({
    operation: z.enum(['create', 'update', 'delete']),
    recordSet: route53RecordSchema,
    hostedZoneId: z.string().max(32, 'HostedZone Id should be atleast 32 characters')
});

export type RecordSetBody = z.infer<typeof recordSetBodySchema>;

