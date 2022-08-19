import {createSlice} from '@reduxjs/toolkit';
import {fetchCredits} from '../thunks/fetch_credits';

const creditsSlice = createSlice({
  name: 'credits',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCredits.fulfilled, (state, {payload}) => {
      console.log(payload);
      return payload;
    });
    builder.addCase(fetchCredits.rejected, (state, action) => {
      console.error(action);
    });
  },
});

export default creditsSlice.reducer;
