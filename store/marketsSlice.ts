import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './reduxStore';

const initialState : InitialState = {
  markets: []
};

interface InitialState {
  markets: {}[]
}

export const marketsSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    updateMarkets: (state, action: PayloadAction<{}[]>) => {
      state.markets = action.payload;
    },
  },
});

export const { updateMarkets } = marketsSlice.actions;

export const getMarkets = (state: RootState) =>  state.markets

export default marketsSlice.reducer;
