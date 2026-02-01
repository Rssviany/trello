import express from 'express'
import protect from '../middleware/AuthMiddleware.js';
import { createList, getAllList } from '../controllers/ListController.js';

const listRouter=express.Router();

listRouter.post('/creating_list',protect,createList);
listRouter.get('/list_items',protect,getAllList);

export default listRouter;