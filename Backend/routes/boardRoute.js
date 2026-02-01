import express from 'express'
import protect from '../middleware/authMiddleware.js';
import { createBoard, getAllBoard, getOrCreateBoard,  } from '../controllers/boardController.js';

const boardRouter=express.Router();

boardRouter.get('/default',protect,getOrCreateBoard);
boardRouter.post('/creating_board',protect,createBoard);
boardRouter.get('/all_boards',protect,getAllBoard);

export default boardRouter;