import { createSlice } from "@reduxjs/toolkit";
import groupsService from '../services/groups';
import { addGroup } from "./groupsReducer";

const groupSlice = createSlice({
  name: 'group',
  initialState: null,
  reducers: {
    setGroup(state, action) {
      return action.payload;
    },
    addNewActivty(state, { payload }) {
      const history = state.history.concat(payload);
      return {
        ...state,
        history
      };
    },
    reset() {
      return null;
    },
  },
});

export const { reset, setGroup, addNewActivty } = groupSlice.actions;

export const createGroup = (groupName) => {
    return async dispatch => {
        const newGroup = await groupsService.create(groupName)
        dispatch(setGroup(newGroup));
        dispatch(addGroup(newGroup));
    }
}

export default groupSlice.reducer;