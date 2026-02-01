import express from 'express'
import protect from '../middleware/authMiddleware.js';
import { createCard, deleteCard, getAllCards } from '../controllers/cardController.js';


const cardRouter=express.Router();

cardRouter.post('/creating_card',protect,createCard);
cardRouter.get('/all_cards',protect,getAllCards);
cardRouter.delete('/delete_card/:cardId',protect,deleteCard);

export default cardRouter;