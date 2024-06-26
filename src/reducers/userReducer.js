import { createSlice } from "@reduxjs/toolkit";
import { setToken } from '../utils/tokenManager';
import userService from '../services/login';

const identifier = 'loggedMovieAppUser';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      setToken(action.payload.token);
      return action.payload;
    },
    resetUser() {
      window.localStorage.clear();
      setToken(null);
      return null;
    },
  },
});

const { setUser } = userSlice.actions;
export const { resetUser } = userSlice.actions;

export const login = (username, password) => {
  return async (dispatch) => {
    const userLogin = await userService.login(username, password);
           
    window.localStorage.setItem(
      identifier,
      JSON.stringify(userLogin)
    );

    dispatch(setUser(userLogin));
  };
};

export const checkLogged = () => {
  return async (dispatch) => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem(identifier));
    if (loggedUserJSON) {
      dispatch(setUser(loggedUserJSON));
    }
  };
};

export default userSlice.reducer;