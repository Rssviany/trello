import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './BoardSlice';
import userReducer from './UserSlice';


export const store=configureStore({
    reducer:{
        boards:boardsReducer,
        user:userReducer
    },
});