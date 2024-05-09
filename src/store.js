import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './reducers/moviesReducer';
import userReducer from './reducers/userReducer';
import groupsReducer from './reducers/groupsReducer';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
    groups: groupsReducer,
  },
});

export default store;