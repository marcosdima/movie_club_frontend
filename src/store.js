import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './reducers/moviesReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        user: userReducer
    }
})

export default store