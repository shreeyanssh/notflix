import {configureStore} from '@reduxjs/toolkit';
import movieReducer from './Reducers/MovieSlice';
import tvReducer from './Reducers/TvSlice';
import personReducer from './Reducers/PeopleSlice';

export const store = configureStore({
    reducer:{
        movie: movieReducer,
        tv: tvReducer,
        person: personReducer, 
    },
})