const route53RecordTypesWithExample = [
    { value: 'A', label: 'A Record', placeholder: 'Enter IPv4 address (e.g. 192.0.2.1)' },
    { value: 'AAAA', label: 'AAAA Record', placeholder: 'Enter IPv6 address (e.g. 2001:0db8:85a3:0000:0000:8a2e:0370:7334)' },
    { value: 'CNAME', label: 'CNAME Record', placeholder: 'Enter domain name (e.g. example.com)' },
    { value: 'MX', label: 'MX Record', placeholder: 'Enter mail server (e.g. mail.example.com)' },
    { value: 'NS', label: 'NS Record', placeholder: 'Enter name server (e.g. ns1.example.com)' },
    { value: 'PTR', label: 'PTR Record', placeholder: 'Enter domain name (e.g. example.com)' },
    { value: 'SOA', label: 'SOA Record', placeholder: 'Enter SOA details (e.g. ns1.example.com hostmaster.example.com 2022010101 3600 600 604800 86400)' },
    { value: 'SPF', label: 'SPF Record', placeholder: 'Enter SPF details (e.g. v=spf1 mx -all)' },
    { value: 'SRV', label: 'SRV Record', placeholder: 'Enter service details (e.g. _service._protocol.example.com)' },
    { value: 'TXT', label: 'TXT Record', placeholder: 'Enter text (e.g. "Hello, World!")' },
];

export default route53RecordTypesWithExample;
