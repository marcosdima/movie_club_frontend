import { createSlice } from "@reduxjs/toolkit";
import genericService from '../services/genericService';
import { addGroup, updateGroup } from "./groupsReducer";

const groupSlice = createSlice({
  name: 'group',
  initialState: null,
  reducers: {
    setGroup(state, action) {
      return action.payload;
    },
    addNewActivity(state, { payload }) {
      const history = state.history.concat(payload);
      return {
        ...state,
        history,
      };
    },
    updateAnActivity(state, { payload }){
      const history = state.history.map((activity) => payload.id !== activity.id ? activity : payload);
      return {
        ...state,
        history,
      };
    },
    resetGroup() {
      return null;
    },
  },
});

const { updateAnActivity } = groupSlice.actions;

export const { resetGroup, setGroup, addNewActivity } = groupSlice.actions;
 
export const createGroup = (groupName) => {
  return async (dispatch) => {
    const newGroup = await genericService.create('groups', { groupName });
    dispatch(setGroup(newGroup));
    dispatch(addGroup(newGroup));
  };
};

export const updateActivity = (activityToUpdate) => {
  return async (dispatch) => {
    dispatch(updateGroup(activityToUpdate));
    dispatch(updateAnActivity(activityToUpdate));
  }
}

export default groupSlice.reducer;