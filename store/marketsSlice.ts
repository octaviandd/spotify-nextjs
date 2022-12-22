import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const initialState: {}[] = [];

export const marketsSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    updateMarkets: (state, action: PayloadAction<{}[]>) => {
      state = action.payload;
    },
  },
});

export const { updateMarkets } = marketsSlice.actions;

export const getMarkets = (state: RootState) => state.markets;

export default marketsSlice.reducer;
