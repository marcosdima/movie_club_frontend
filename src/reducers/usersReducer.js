import { createSlice } from "@reduxjs/toolkit";
import genericService from '../services/genericService';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, { payload }) {
      return payload;
    },
    addUser(state, { payload }) {
      return state.concat(payload);
    },
    resetUsers() {
      return [];
    },
  },
});

export const { addUser, resetUsers } = usersSlice.actions;
const { setUsers } = usersSlice.actions;

export const initialUsers = () => {
  return async (dispatch) => {
    const users = await genericService.getAll('users');
    dispatch(setUsers(users));
  };
};

export default usersSlice.reducer;