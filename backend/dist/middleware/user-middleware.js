"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const userMiddlewareSchema = zod_1.default.object({
    authorization: zod_1.default.string().refine((value) => value.startsWith("Bearer "), {
        message: "Invalid authorization header",
    }),
});
const userMiddleware = (req, res, next) => {
    var _a;
    // Get the JWT token from the request headers
    try {
        const { success } = userMiddlewareSchema.safeParse(req.headers);
        if (!success) {
            return res.status(401).json({ message: 'Unauthorized ' });
        }
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            // Verify the JWT token
            const decodedToken = jsonwebtoken_1.default.verify(token, 'secret');
            if (decodedToken) {
                req.userId = decodedToken.userId.toString();
            }
            next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
    catch (error) {
        return res.status(401).json({ message: 'Token is missing' });
    }
};
exports.default = userMiddleware;
