import { configureStore } from '@reduxjs/toolkit';
import  pokeBoxReducer from './pokeBoxSlice';

export const store = configureStore({
    reducer: {
        pokeBox: pokeBoxReducer
    },
})