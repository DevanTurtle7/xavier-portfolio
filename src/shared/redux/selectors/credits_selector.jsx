import {createSelector} from '@reduxjs/toolkit';

const selectCredits = (state) => state.credits;

export const creditsSelector = createSelector(selectCredits, (credits) => {
  return credits;
});
