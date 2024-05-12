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
    addGroup(state, action) {
      const newGroup = action.payload;
      return state.concat(newGroup)
    },
    reset() {
      return [];
    },
  },
});

export const { reset, addGroup } = groupsSlice.actions;
const { setGroups } = groupsSlice.actions;

export const initialGroups = () => {
  return async (dispatch) => {
    const groups = await groupsService.getGroups();
    dispatch(setGroups(groups));
  };
};

export default groupsSlice.reducer;