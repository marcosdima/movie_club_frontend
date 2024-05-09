import { createSlice } from "@reduxjs/toolkit";
import movieService from "../services/movies";

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
    reset() {
      return [];
    },
  },
});

const { appendMovie } = moviesSlice.actions;
export const { setMovies, reset } = moviesSlice.actions;

export const addMovie = (content) => {
  return async (dispatch) => {
    const movie = await movieService.add(content);
    dispatch(appendMovie(movie));
  };
};
export const initialMovies = () => {
  return async (dispatch) => {
    const movies = await movieService.getAll();
    dispatch(setMovies(movies));
  };
};

export default moviesSlice.reducer;