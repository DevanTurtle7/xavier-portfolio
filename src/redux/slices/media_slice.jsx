import { createSlice } from "@reduxjs/toolkit";
import { fetchMedia } from "../thunks/load_media";

const setMedia = (state, payload) => state.media = payload

const imagesSlice = createSlice({
    name: 'media',
    initialState: [],
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchMedia.fulfilled, (state, action) => {
            return action.payload
        });
        builder.addCase(fetchMedia.rejected, (state, action) => {
            console.error(action)
        });
    }
})

export default imagesSlice.reducer