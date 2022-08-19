import {createAsyncThunk} from '@reduxjs/toolkit';
import {getDoc, doc} from 'firebase/firestore';

export const fetchCredits = createAsyncThunk('fetchCredits', async (db) => {
  const creditsDoc = await getDoc(doc(db, 'credits', 'credits'));
  const credits = creditsDoc.data();

  return [...credits.credits];
});
