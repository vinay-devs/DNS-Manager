import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user-model';
import crypto, { createCipheriv, createDecipheriv } from 'node:crypto'
import { Credentials, credentialsSchema, Signin, signinSchema, Signup, signupSchema } from '@vinaydevs/common-dnsmanager';



interface RequestWithUserId extends Request {
    userId: string,
}
// User model and database operations

const secretKeyHex = '2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b'
const ivKeyHex = '01b5a99b9a78372fb6570db8bf17010b'
const secretKey = Buffer.from(secretKeyHex, 'hex');
const iv = Buffer.from(ivKeyHex, 'hex')

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
        const { success } = signupSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ message: "Invalid input" })
        }
        const { name, email, password }: Signup = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {

        res.status(500).json({ message: 'Internal server error' });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const { success } = signinSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ message: "Invalid input" })
        }
        const { email, password }: Signin = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id }, 'secret');
        res.status(200).json({ token, message: 'User signed in successfully', user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const addCredentials = async (req: Request, res: Response) => {
    try {
        const userId = (req as unknown as RequestWithUserId).userId;
        const { success } = credentialsSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ message: "Invalid input" })
        }
        const { accessKey, secretKey }: Credentials = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const accessEnc = encrypt(accessKey)
        const secretEnc = encrypt(secretKey);

        await User.updateOne({
            accessKey: accessEnc,
            secretKey: secretEnc,
            region: 'us-east-1',
        })
        await user.save();
        res.status(200).json({ message: 'Credentials added successfully' });
    } catch (error) {

        res.status(500).json({ message: 'Internal server error' });
    }
};
