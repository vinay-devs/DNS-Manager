import { z } from "zod";
import { recordSchema } from "./recordSchema";

// Define the validation schema for Route53 record types
export const route53RecordSchema = z.object({
    Name: z.string(),
    Type: z.enum(["A", "AAAA", "CNAME", "MX", "NS", "PTR", "SOA", "SPF", "SRV", "TXT"]),
    ResourceRecords: z.array(z.object({
        Value: z.string()
    })),
    TTL: z.number().optional(),
}).superRefine((data, ctx) => {
    const { Type, ResourceRecords } = data;
    ResourceRecords.forEach((resourceRecord) => {
        const valueToCheck = resourceRecord.Value;
        const { success } = recordSchema.safeParse({ type: Type, value: valueToCheck })
        if (!success) {
            return ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Invalid record ${Type} and Value combination` });
        }
    })
});

export type Route53Record = z.infer<typeof route53RecordSchema>;

export const signupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
});

export type Signup = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export type Signin = z.infer<typeof signinSchema>;

export const credentialsSchema = z.object({
    credentials: z.object({
        accessKey: z.string(),
        secretKey: z.string(),
        region: z.string()
    })
});

export type Credentials = z.infer<typeof credentialsSchema>;

export const hostedZoneId = z.string();

export type HostedZoneId = z.infer<typeof hostedZoneId>;

export const recordSetBodySchema = z.object({
    operation: z.enum(['create', 'update', 'delete']),
    recordSet: route53RecordSchema,
    hostedZoneId: z.string()
});

export type RecordSetBody = z.infer<typeof recordSetBodySchema>;

