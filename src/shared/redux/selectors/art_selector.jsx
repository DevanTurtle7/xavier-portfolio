import { createSelector } from "@reduxjs/toolkit";

const selectArt = (state) => state.art;

export const artSelector = createSelector(selectArt, (art) => {
  return art;
});