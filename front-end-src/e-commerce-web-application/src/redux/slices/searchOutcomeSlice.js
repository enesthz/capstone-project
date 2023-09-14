import { createSlice } from '@reduxjs/toolkit';

const searchOutcomeSlice = createSlice({
  name: 'searchOutcome',
  initialState: null,
  reducers: {
    updateSearchOutcome: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateSearchOutcome } = searchOutcomeSlice.actions;

export function selectSearchOutcome(state) {
  return state.searchOutcome;
}

const searchOutcomeReducer = searchOutcomeSlice.reducer;
export default searchOutcomeReducer;
