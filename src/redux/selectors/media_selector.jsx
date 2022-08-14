import { createSelector } from "@reduxjs/toolkit";

const selectMedia = state => state.media
export const mediaSelector = createSelector(selectMedia, (media) => {
    return media
})