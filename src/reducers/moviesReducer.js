import { createSlice } from "@reduxjs/toolkit";
import genericService from "../services/genericService";

const moviesSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {
    appendMovie(state, action) {
      return state.concat(action.payload);
    },
    setMovies(state, action) {
      return action.payload;
    },
    resetMovies() {
      return [];
    },
  },
});

const { appendMovie } = moviesSlice.actions;
export const { setMovies, resetMovies } = moviesSlice.actions;

export const addMovie = (content) => {
  return async (dispatch) => {
    const movie = await genericService.create('movies', content);
    dispatch(appendMovie(movie));
  };
};
export const initialMovies = () => {
  return async (dispatch) => {
    const movies = await genericService.getAll('movies');
    dispatch(setMovies(movies));
  };
};

export default moviesSlice.reducer;