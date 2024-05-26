"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordSchema = void 0;
const zod_1 = require("zod");
// Regex for IPv4 and IPv6 validation
const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}(([0-9]{1,3}\.){3,3}[0-9]{1,3})|([0-9a-fA-F]{1,4}:){1,4}:([0-9]{1,3}\.){3,3}[0-9]{1,3})$/;
const domainNameRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)?[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
const txtRecordRegex = /^".*"( ".*")*$/;
// Zod schemas for different Route 53 record types
// A (Address) Record
const aRecordSchema = zod_1.z.object({
    type: zod_1.z.literal('A'),
    value: zod_1.z.string().regex(ipv4Regex, { message: 'Invalid IPv4 address' })
});
// AAAA (IPv6 Address) Record
const aaaaRecordSchema = zod_1.z.object({
    type: zod_1.z.literal('AAAA'),
    value: zod_1.z.string().regex(ipv6Regex, { message: 'Invalid IPv6 address' })
});
// CNAME (Canonical Name) Record
const cnameRecordSchema = zod_1.z.object({
    type: zod_1.z.literal('CNAME'),
    value: zod_1.z.string().regex(domainNameRegex, { message: 'Invalid domain name' })
});
// MX (Mail Exchange) Record
const mxRecordSchema = zod_1.z.object({
    type: zod_1.z.literal('MX'),
    value: zod_1.z.string().regex(/^\d+\s+[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,11}$/, { message: 'Invalid MX record format' })
});
// NS (Name Server) Record
const nsRecordSchema = zod_1.z.object({
    type: zod_1.z.literal('NS'),
    value: zod_1.z.string().regex(domainNameRegex, { message: 'Invalid domain name' })
});
// PTR (Pointer) Record
const ptrRecordSchema = zod_1.z.object({
    type: zod_1.z.literal('PTR'),
    value: zod_1.z.string().regex(domainNameRegex, { message: 'Invalid domain name' })
});
// SOA (Start of Authority) Record
const soaRecordSchema = zod_1.z.object({
    type: zod_1.z.literal('SOA'),
    value: zod_1.z.string().regex(/^[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,11}\s+[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,11}\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+$/, { message: 'Invalid SOA record format' })
});
// SRV (Service) Record
const srvRecordSchema = zod_1.z.object({
    type: zod_1.z.literal('SRV'),
    value: zod_1.z.string().regex(/^\d+\s+\d+\s+\d+\s+[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,11}$/, { message: 'Invalid SRV record format' })
});
// TXT (Text) Record
const txtRecordSchema = zod_1.z.object({
    type: zod_1.z.literal('TXT'),
    value: zod_1.z.string().regex(txtRecordRegex, { message: 'Invalid TXT record format' })
});
// Union schema for all record types
const recordSchema = zod_1.z.union([
    aRecordSchema,
    aaaaRecordSchema,
    cnameRecordSchema,
    mxRecordSchema,
    nsRecordSchema,
    ptrRecordSchema,
    soaRecordSchema,
    srvRecordSchema,
    txtRecordSchema,
]);
exports.recordSchema = recordSchema;
