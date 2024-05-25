import express from 'express';
import { signup, signin, addCredentials } from '../controllers/user-controller';
import userMiddleware from '../middleware/user-middleware';


const router = express.Router();

// Signup route
router.post('/signup', signup);

// Signin route
router.post('/signin', signin);

// Add access key route
router.post('/credentials', userMiddleware, addCredentials);


export { router as userRouter }