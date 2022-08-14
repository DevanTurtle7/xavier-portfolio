import { createSelector } from "@reduxjs/toolkit";

const selectArchive = (state) => state.archive;

export const archiveSelector = createSelector(selectArchive, (archive) => {
  return archive;
});