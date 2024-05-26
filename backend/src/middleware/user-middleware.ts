import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import z from 'zod'
interface requestWithUserId extends Request {
    decodedToken: JwtPayload
    userId: string
}
const userMiddlewareSchema = z.object({
    authorization: z.string().refine((value) => value.startsWith("Bearer "), {
        message: "Invalid authorization header",
    }),
});
const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Get the JWT token from the request headers
    try {
        const { success } = userMiddlewareSchema.safeParse(req.headers);
        if (!success) {
            return res.status(401).json({ message: 'Unauthorized ' });
        }
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            // Verify the JWT token
            const decodedToken = jwt.verify(token, 'secret') as JwtPayload;
            if (decodedToken) {
                (req as unknown as requestWithUserId).userId = decodedToken.userId.toString()
            }
            next();
        } catch (error) {
            console.log(error)
            return res.status(401).json({ message: 'Invalid token' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Token is missing' });
    }

};

export default userMiddleware;