import { createSlice } from "@reduxjs/toolkit";
import genericService from "../services/genericService";

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
    resetGroups() {
      return [];
    },
  },
});

export const { resetGroups, addGroup } = groupsSlice.actions;
const { setGroups } = groupsSlice.actions;

export const initialGroups = () => {
  return async (dispatch) => {
    const groups = await genericService.getAll('groups');
    dispatch(setGroups(groups));
  };
};

export default groupsSlice.reducer;