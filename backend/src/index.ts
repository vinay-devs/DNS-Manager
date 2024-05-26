import express, { Express } from "express"
import { dnsRouter } from './routes/dns-router';
import { userRouter } from "./routes/user-router";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + '/.env' });
const app: Express = express();

app.use(express.json())

app.use('/api/v1/dns/', dnsRouter)
app.use('/api/v1/user/', userRouter)


mongoose
    .connect(
        process.env.MONGODB_URL as string,
    )
    .then(() =>
        app.listen(5001, () =>
            console.log(`Connected to database and server running at 5001`)
        )
    )
    .catch((err) => console.log(err));


