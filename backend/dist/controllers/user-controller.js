"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCredentials = exports.signin = exports.signup = exports.decrypt = exports.encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user-model"));
const node_crypto_1 = require("node:crypto");
const common_dnsmanager_1 = require("@vinaydevs/common-dnsmanager");
// User model and database operations
const secretKeyHex = '2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b';
const ivKeyHex = '01b5a99b9a78372fb6570db8bf17010b';
const secretKey = Buffer.from(secretKeyHex, 'hex');
const iv = Buffer.from(ivKeyHex, 'hex');
function encrypt(text) {
    const cipher = (0, node_crypto_1.createCipheriv)("aes-256-cbc", secretKey, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}
exports.encrypt = encrypt;
function decrypt(encryptedText) {
    const decipher = (0, node_crypto_1.createDecipheriv)("aes-256-cbc", secretKey, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
exports.decrypt = decrypt;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = common_dnsmanager_1.signupSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ message: "Invalid input" });
        }
        const { name, email, password } = req.body;
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_model_1.default({ name, email, password: hashedPassword });
        yield newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = common_dnsmanager_1.signinSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ message: "Invalid input" });
        }
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, 'secret');
        res.status(200).json({ token, message: 'User signed in successfully', user: { name: user.name, email: user.email } });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.signin = signin;
const addCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { success } = common_dnsmanager_1.credentialsSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ message: "Invalid input" });
        }
        const { accessKey, secretKey } = req.body;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const accessEnc = encrypt(accessKey);
        const secretEnc = encrypt(secretKey);
        yield user_model_1.default.updateOne({
            accessKey: accessEnc,
            secretKey: secretEnc,
            region: 'us-east-1',
        });
        yield user.save();
        res.status(200).json({ message: 'Credentials added successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addCredentials = addCredentials;
