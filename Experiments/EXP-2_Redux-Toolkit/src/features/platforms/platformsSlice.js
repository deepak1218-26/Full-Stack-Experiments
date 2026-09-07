import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPlatform: "Instagram",
};

const platformsSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {
    setPlatform: (state, action) => {
      state.selectedPlatform = action.payload;
    },
  },
});

export const { setPlatform } = platformsSlice.actions;

export default platformsSlice.reducer;