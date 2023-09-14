import { createSlice } from '@reduxjs/toolkit';

export const userIdSlice = createSlice({
  name: 'userId',
  initialState: null,
  reducers: {
    updateUserId: (state, action) => {
      return action.payload;
    },
    removeUserId: (state) => {
      return null;
    },
  },
});

export const { updateUserId, removeUserId } = userIdSlice.actions;
export function selectUserId(state) {
  return state.userId;
}

let userIdReducer = userIdSlice.reducer;
export default userIdReducer;
