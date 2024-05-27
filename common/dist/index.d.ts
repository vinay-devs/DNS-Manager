import { z } from "zod";
export declare const recordSchemaCheck: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"A">;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "A";
    value: string;
}, {
    type: "A";
    value: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"AAAA">;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "AAAA";
    value: string;
}, {
    type: "AAAA";
    value: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"CNAME">;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "CNAME";
    value: string;
}, {
    type: "CNAME";
    value: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"MX">;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "MX";
    value: string;
}, {
    type: "MX";
    value: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"NS">;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "NS";
    value: string;
}, {
    type: "NS";
    value: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"PTR">;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "PTR";
    value: string;
}, {
    type: "PTR";
    value: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"SOA">;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "SOA";
    value: string;
}, {
    type: "SOA";
    value: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"SRV">;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "SRV";
    value: string;
}, {
    type: "SRV";
    value: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"TXT">;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "TXT";
    value: string;
}, {
    type: "TXT";
    value: string;
}>]>;
export declare const route53RecordSchema: z.ZodEffects<z.ZodObject<{
    Name: z.ZodString;
    Type: z.ZodEnum<["A", "AAAA", "CNAME", "MX", "NS", "PTR", "SOA", "SPF", "SRV", "TXT"]>;
    ResourceRecords: z.ZodOptional<z.ZodArray<z.ZodObject<{
        Value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        Value: string;
    }, {
        Value: string;
    }>, "many">>;
    TTL: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    Name: string;
    Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
    ResourceRecords?: {
        Value: string;
    }[] | undefined;
    TTL?: number | undefined;
}, {
    Name: string;
    Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
    ResourceRecords?: {
        Value: string;
    }[] | undefined;
    TTL?: number | undefined;
}>, {
    Name: string;
    Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
    ResourceRecords?: {
        Value: string;
    }[] | undefined;
    TTL?: number | undefined;
}, {
    Name: string;
    Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
    ResourceRecords?: {
        Value: string;
    }[] | undefined;
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
    }, "strip", z.ZodTypeAny, {
        accessKey: string;
        secretKey: string;
    }, {
        accessKey: string;
        secretKey: string;
    }>;
}, "strip", z.ZodTypeAny, {
    credentials: {
        accessKey: string;
        secretKey: string;
    };
}, {
    credentials: {
        accessKey: string;
        secretKey: string;
    };
}>;
export type Credentials = z.infer<typeof credentialsSchema>;
export declare const recordSetBodySchema: z.ZodObject<{
    operation: z.ZodEnum<["create", "update", "delete"]>;
    recordSet: z.ZodEffects<z.ZodObject<{
        Name: z.ZodString;
        Type: z.ZodEnum<["A", "AAAA", "CNAME", "MX", "NS", "PTR", "SOA", "SPF", "SRV", "TXT"]>;
        ResourceRecords: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            Value: string;
        }, {
            Value: string;
        }>, "many">>;
        TTL: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        Name: string;
        Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
        ResourceRecords?: {
            Value: string;
        }[] | undefined;
        TTL?: number | undefined;
    }, {
        Name: string;
        Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
        ResourceRecords?: {
            Value: string;
        }[] | undefined;
        TTL?: number | undefined;
    }>, {
        Name: string;
        Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
        ResourceRecords?: {
            Value: string;
        }[] | undefined;
        TTL?: number | undefined;
    }, {
        Name: string;
        Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
        ResourceRecords?: {
            Value: string;
        }[] | undefined;
        TTL?: number | undefined;
    }>;
    hostedZoneId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    operation: "create" | "update" | "delete";
    recordSet: {
        Name: string;
        Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
        ResourceRecords?: {
            Value: string;
        }[] | undefined;
        TTL?: number | undefined;
    };
    hostedZoneId: string;
}, {
    operation: "create" | "update" | "delete";
    recordSet: {
        Name: string;
        Type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "PTR" | "SOA" | "SRV" | "TXT" | "SPF";
        ResourceRecords?: {
            Value: string;
        }[] | undefined;
        TTL?: number | undefined;
    };
    hostedZoneId: string;
}>;
export type RecordSetBody = z.infer<typeof recordSetBodySchema>;
