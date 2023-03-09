import { createSlice } from '@reduxjs/toolkit';

export const pokeBoxSlice = createSlice({
    name: 'pokeBox',
    initialState: {
        pokemons: []
        // pokemons: [
        //     {id: Date.now(), pokeId: '418', name: 'ブイゼル', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/418.png', level: 59},
        //     {id: Date.now() + 1, pokeId: '418', name: 'ブイゼル', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/418.png', level: 59},
        //     {id: Date.now() + 2, pokeId: '418', name: 'ブイゼル', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/418.png', level: 59},
        //     {id: Date.now() + 3, pokeId: '418', name: 'ブイゼル', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/418.png', level: 59},
        //     {id: Date.now() + 4, pokeId: '418', name: 'ブイゼル', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/418.png', level: 59},
        //     {id: Date.now() + 5, pokeId: '418', name: 'ブイゼル', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/418.png', level: 59},
        //     {id: Date.now() + 6, pokeId: '418', name: 'ブイゼル', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/418.png', level: 59},
        // ]
    },
    reducers: {
        add: (state, { payload }) => {
            state.pokemons = [...state.pokemons, payload];
        },
        release: (state, { payload }) => {
            return state.pokemons.filter(pokemon => pokemon.pokeId !== payload);
        },
    }
});

export const { add, release } = pokeBoxSlice.actions;

export default pokeBoxSlice.reducer;