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
      return state.concat(newGroup);
    },
    updateGroup(state, { payload }){
      const stateUpdated = state.map((group) => payload.id !== group.id ? group : payload);
      return stateUpdated
    },
    updateActivityInGroup(state, { payload }){
      const stateUpdated = state.map((group) => (
        payload.group !== group.id
        ? group
        : { 
            ...group, 
            history: group.history.map((activity) => activity.id !== payload.id ? activity : payload)
          }
      ));
      return stateUpdated;
    },
    resetGroups() {
      return [];
    },
  },
});

export const { resetGroups, addGroup, updateGroup, updateActivityInGroup } = groupsSlice.actions;
const { setGroups } = groupsSlice.actions;

export const initialGroups = () => {
  return async (dispatch) => {
    const groups = await genericService.getAll('groups');
    dispatch(setGroups(groups));
  };
};

export default groupsSlice.reducer;