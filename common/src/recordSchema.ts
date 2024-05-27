import { z } from 'zod';

// Regex for IPv4 and IPv6 validation
const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}(([0-9]{1,3}\.){3,3}[0-9]{1,3})|([0-9a-fA-F]{1,4}:){1,4}:([0-9]{1,3}\.){3,3}[0-9]{1,3})$/;
const domainNameRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)?[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
const txtRecordRegex = /^[a-zA-Z0-9 \-!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~.]{1,255}$/;


// Zod schemas for different Route 53 record types

// A (Address) Record
const aRecordSchema = z.object({
    type: z.literal('A'),
    value: z.string().regex(ipv4Regex, { message: 'Invalid IPv4 address' })
});

// AAAA (IPv6 Address) Record
const aaaaRecordSchema = z.object({
    type: z.literal('AAAA'),
    value: z.string().regex(ipv6Regex, { message: 'Invalid IPv6 address' })
});

// CNAME (Canonical Name) Record
const cnameRecordSchema = z.object({
    type: z.literal('CNAME'),
    value: z.string().regex(domainNameRegex, { message: 'Invalid domain name' })
});

// MX (Mail Exchange) Record
const mxRecordSchema = z.object({
    type: z.literal('MX'),
    value: z.string().regex(/^\d+\s+[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,11}$/, { message: 'Invalid MX record format' })
});

// NS (Name Server) Record
const nsRecordSchema = z.object({
    type: z.literal('NS'),
    value: z.string().regex(domainNameRegex, { message: 'Invalid domain name' })
});

// PTR (Pointer) Record
const ptrRecordSchema = z.object({
    type: z.literal('PTR'),
    value: z.string().regex(domainNameRegex, { message: 'Invalid domain name' })
});

// SOA (Start of Authority) Record
const soaRecordSchema = z.object({
    type: z.literal('SOA'),
    value: z.string().regex(/^[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,11}\s+[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,11}\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+$/, { message: 'Invalid SOA record format' })
});

// SRV (Service) Record
const srvRecordSchema = z.object({
    type: z.literal('SRV'),
    value: z.string().regex(/^\d+\s+\d+\s+\d+\s+[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,11}$/, { message: 'Invalid SRV record format' })
});

// TXT (Text) Record
const txtRecordSchema = z.object({
    type: z.literal('TXT'),
    value: z.string().regex(txtRecordRegex, { message: 'Invalid TXT record format' })
});


// Union schema for all record types
const recordSchema = z.union([
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

export { recordSchema };
