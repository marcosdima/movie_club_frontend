import { createSlice } from "@reduxjs/toolkit";
import groupsService from '../services/groups';
import { addGroup } from "./groupsReducer";

const groupSlice = createSlice({
  name: 'groups',
  initialState: {},
  reducers: {
    setGroup(state, action) {
      return action.payload;
    },
    reset() {
      return [];
    },
  },
});

export const { reset, setGroup } = groupSlice.actions;

export const createGroup = (groupName) => {
    return async dispatch => {
        const newGroup = await groupsService.create(groupName)
        dispatch(setGroup(newGroup));
        dispatch(addGroup(newGroup));
    }
}

export default groupSlice.reducer;