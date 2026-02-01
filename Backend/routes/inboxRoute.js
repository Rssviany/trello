import express from 'express';
import { createInbox, getInboxItems, updateInboxItems } from '../controllers/InboxLeft.js';
import protect from '../middleware/AuthMiddleware.js';

const inboxRouter=express.Router();

inboxRouter.post('/items_creating',protect,createInbox);
inboxRouter.get('/items',protect,getInboxItems);
inboxRouter.patch('/items/:id',protect,updateInboxItems)

export default inboxRouter;