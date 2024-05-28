"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dns_router_1 = require("./routes/dns-router");
const user_router_1 = require("./routes/user-router");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({ path: __dirname + '/.env' });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/api/v1/dns/', dns_router_1.dnsRouter);
app.use('/api/v1/user/', user_router_1.userRouter);
mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(() => app.listen(5001, () => console.log(`Connected to database and server running at 5001`)))
    .catch((err) => console.log(err));
