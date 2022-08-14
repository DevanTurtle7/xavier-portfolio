import { createSlice } from '@reduxjs/toolkit';
import { fetchMedia } from '../thunks/load_media';

const archiveSlice = createSlice({
  name: 'archive',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMedia.fulfilled, (state, { payload }) => {
      if (payload.collection === 'other') {
        return payload.media;
      }
    });
    builder.addCase(fetchMedia.rejected, (state, action) => {
      console.error(action);
    });
  },
});

export default archiveSlice.reducer;
