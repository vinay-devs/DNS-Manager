import express from 'express';
import { getAllHostedList, getResorceRecordSet, postRecordSet } from '../controllers/dns-controller';
import userMiddleware from '../middleware/user-middleware';



const router = express.Router();

//ensure to add middleware with (req as unknown as requestWithUserId) type
router.get('/list-hosted-zone', userMiddleware, getAllHostedList)

router.get('/list-resource-record/:hostedzoneId', userMiddleware, getResorceRecordSet)

router.post('/record-set', userMiddleware, postRecordSet)

export { router as dnsRouter }