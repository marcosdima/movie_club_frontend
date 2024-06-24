import { createSlice } from "@reduxjs/toolkit";
import genericService from '../services/genericService';
import {
  addGroup, updateActivityInGroup, addActivityInGroup, 
} from "./groupsReducer";

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

const { updateAnActivity, addNewActivity } = groupSlice.actions;

export const { resetGroup, setGroup  } = groupSlice.actions;
 
export const createGroup = (groupName) => {
  return async (dispatch) => {
    const newGroup = await genericService.create('groups', { name: groupName });
    dispatch(setGroup(newGroup));
    dispatch(addGroup(newGroup));
  };
};

export const updateActivity = (activityToUpdate) => {
  return async (dispatch) => {
    dispatch(updateActivityInGroup(activityToUpdate));
    dispatch(updateAnActivity(activityToUpdate));
  };
};

export const addActivity = (newActivity) => {
  return async (dispatch) => {
    dispatch(addNewActivity(newActivity));
    dispatch(addActivityInGroup(newActivity));
  };
};

export default groupSlice.reducer;