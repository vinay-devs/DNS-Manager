"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dnsRouter = void 0;
const express_1 = __importDefault(require("express"));
const dns_controller_1 = require("../controllers/dns-controller");
const user_middleware_1 = __importDefault(require("../middleware/user-middleware"));
const router = express_1.default.Router();
exports.dnsRouter = router;
//ensure to add middleware with (req as unknown as requestWithUserId) type
router.get('/list-hosted-zone', user_middleware_1.default, dns_controller_1.getAllHostedList);
router.get('/list-resource-record/:hostedzoneId', user_middleware_1.default, dns_controller_1.getResorceRecordSet);
router.post('/record-set', user_middleware_1.default, dns_controller_1.postRecordSet);
