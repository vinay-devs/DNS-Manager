import { z } from 'zod';
declare const recordSchema: z.ZodUnion<[z.ZodObject<{
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
export { recordSchema };
