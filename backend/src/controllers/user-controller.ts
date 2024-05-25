import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user-model';
import crypto, { createCipheriv, createDecipheriv } from 'node:crypto'



interface RequestWithUserId extends Request {
    userId: string,
}
// User model and database operations
console.log(process.env)
const secretKey = crypto.createHash('sha256').update('secret').digest();;
const iv = crypto.randomBytes(16);

export function encrypt(text: string): string {
    const cipher = createCipheriv("aes-256-cbc", secretKey, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}


export function decrypt(encryptedText: string): string {
    const decipher = createDecipheriv("aes-256-cbc", secretKey, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id }, 'secret');
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const addCredentials = async (req: Request, res: Response) => {
    try {
        const userId = (req as unknown as RequestWithUserId).userId;
        const { credentials } = req.body;
        const { accessKey, secretKey, region } = credentials;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const accessEnc = encrypt(accessKey)
        const secretEnc = encrypt(secretKey);

        await User.updateOne({
            accessKey: accessEnc,
            secretKey: secretEnc,
            region: region
        })
        await user.save();
        res.status(200).json({ message: 'Credentials added successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
};
