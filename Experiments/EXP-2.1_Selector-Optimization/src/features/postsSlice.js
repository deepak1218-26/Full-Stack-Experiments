import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "React Redux Toolkit",
      platform: "Instagram",
      likes: 125,
    },
    {
      id: 2,
      title: "Selectors in Redux",
      platform: "Facebook",
      likes: 80,
    },
    {
      id: 3,
      title: "Memoization Example",
      platform: "LinkedIn",
      likes: 190,
    },
    {
      id: 4,
      title: "React Performance",
      platform: "Instagram",
      likes: 240,
    },
    {
      id: 5,
      title: "Redux Store",
      platform: "Twitter",
      likes: 65,
    },
    {
      id: 6,
      title: "createSelector Demo",
      platform: "LinkedIn",
      likes: 310,
    },
  ],

  selectedPlatform: "All",
};

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    changePlatform: (state, action) => {
      state.selectedPlatform = action.payload;
    },
  },
});

export const { changePlatform } = postsSlice.actions;

export default postsSlice.reducer;