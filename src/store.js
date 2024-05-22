import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './reducers/moviesReducer';
import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';
import groupsReducer from './reducers/groupsReducer';
import groupReducer from './reducers/groupReducer';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
    users: usersReducer,
    groups: groupsReducer,
    group: groupReducer
  },
});

export default store;