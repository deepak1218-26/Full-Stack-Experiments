import { createSelector } from "@reduxjs/toolkit";

export const selectPosts = (state) => state.posts.posts;

export const selectPlatform = (state) => state.posts.selectedPlatform;

export const selectFilteredPosts = createSelector(
  [selectPosts, selectPlatform],
  (posts, platform) => {
    console.log("Memoized Selector Executed");

    if (platform === "All") return posts;

    return posts.filter((post) => post.platform === platform);
  }
);