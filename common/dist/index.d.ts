import { z } from "zod";
export declare const route53RecordSchema: z.ZodEffects<z.ZodObject<{
    Name: z.ZodString;
    Type: z.ZodEnum<["A", "AAAA", "CNAME", "MX", "NS", "PTR", "SOA", "SPF", "SRV", "TXT"]>;
    ResourceRecords: z.ZodArray<z.ZodObject<{
        Value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        Value: string;
    }, {
        Value: string;
    }>, "many">;
    TTL: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    Name: string;
    Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
    ResourceRecords: {
        Value: string;
    }[];
    TTL?: number | undefined;
}, {
    Name: string;
    Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
    ResourceRecords: {
        Value: string;
    }[];
    TTL?: number | undefined;
}>, {
    Name: string;
    Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
    ResourceRecords: {
        Value: string;
    }[];
    TTL?: number | undefined;
}, {
    Name: string;
    Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
    ResourceRecords: {
        Value: string;
    }[];
    TTL?: number | undefined;
}>;
export type Route53Record = z.infer<typeof route53RecordSchema>;
export declare const signupSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export type Signup = z.infer<typeof signupSchema>;
export declare const signinSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type Signin = z.infer<typeof signinSchema>;
export declare const credentialsSchema: z.ZodObject<{
    credentials: z.ZodObject<{
        accessKey: z.ZodString;
        secretKey: z.ZodString;
        region: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        accessKey: string;
        secretKey: string;
        region: string;
    }, {
        accessKey: string;
        secretKey: string;
        region: string;
    }>;
}, "strip", z.ZodTypeAny, {
    credentials: {
        accessKey: string;
        secretKey: string;
        region: string;
    };
}, {
    credentials: {
        accessKey: string;
        secretKey: string;
        region: string;
    };
}>;
export type Credentials = z.infer<typeof credentialsSchema>;
export declare const hostedZoneId: z.ZodString;
export type HostedZoneId = z.infer<typeof hostedZoneId>;
export declare const recordSetBodySchema: z.ZodObject<{
    operation: z.ZodEnum<["create", "update", "delete"]>;
    recordSet: z.ZodEffects<z.ZodObject<{
        Name: z.ZodString;
        Type: z.ZodEnum<["A", "AAAA", "CNAME", "MX", "NS", "PTR", "SOA", "SPF", "SRV", "TXT"]>;
        ResourceRecords: z.ZodArray<z.ZodObject<{
            Value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            Value: string;
        }, {
            Value: string;
        }>, "many">;
        TTL: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        Name: string;
        Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
        ResourceRecords: {
            Value: string;
        }[];
        TTL?: number | undefined;
    }, {
        Name: string;
        Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
        ResourceRecords: {
            Value: string;
        }[];
        TTL?: number | undefined;
    }>, {
        Name: string;
        Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
        ResourceRecords: {
            Value: string;
        }[];
        TTL?: number | undefined;
    }, {
        Name: string;
        Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
        ResourceRecords: {
            Value: string;
        }[];
        TTL?: number | undefined;
    }>;
    hostedZoneId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    operation: "create" | "update" | "delete";
    recordSet: {
        Name: string;
        Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
        ResourceRecords: {
            Value: string;
        }[];
        TTL?: number | undefined;
    };
    hostedZoneId: string;
}, {
    operation: "create" | "update" | "delete";
    recordSet: {
        Name: string;
        Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
        ResourceRecords: {
            Value: string;
        }[];
        TTL?: number | undefined;
    };
    hostedZoneId: string;
}>;
export type RecordSetBody = z.infer<typeof recordSetBodySchema>;
