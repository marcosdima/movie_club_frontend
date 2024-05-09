import { createSlice } from "@reduxjs/toolkit";
import groupsService from "../services/groups";
import userReducer from "./userReducer";

const groupsSlice = createSlice({
  name: 'groups',
  initialState: [],
  reducers: {
    setGroups(state, action) {
      return action.payload;
    },
    reset() {
      return [];
    },
  },
});

export const { reset } = groupsSlice.actions;
const { setGroups } = groupsSlice.actions;

export const initialGroups = () => {
  return async dispatch => {
    const groups = await groupsService.getGroups();
    dispatch(setGroups(groups));
  };
};

export default groupsSlice.reducer;