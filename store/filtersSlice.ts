import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const initialState: FiltersInitialState = {
  seeds: {
    seed_artists: [],
    seed_genres: [],
    seed_tracks: [],
  },
  filters: {
    acousticness: [0, 1],
    danceability: [0, 1],
    duration_ms: [0, 600000],
    energy: [0, 1],
    instrumentalness: [0, 1],
    key: [0, 11],
    liveness: [0, 1],
    loudness: [-10, 100],
    popularity: [0, 100],
    speechiness: [0, 1],
    tempo: [-50, 350],
    valence: [0, 1],
    mode: [0, 1],
  },
};
export interface FiltersInitialState {
  seeds: {
    [key: string]: object[];
  };
  filters: {
    [key: string]: number[];
  };
}

export const filterSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    updateRangeSliders: (state, action: PayloadAction<{ values: number[]; type: string }>) => {
      state.filters[action.payload.type] = action.payload.values;
    },
    updateMultiSelect: (state, action: PayloadAction<{ values: object[]; type: string }>) => {
      state.seeds[action.payload.type] = action.payload.values;
    },
  },
});


export const { updateRangeSliders, updateMultiSelect } = filterSlice.actions;

export const selectProperty = (state: RootState, property: string) => state.filters.filters[property];

export const selectAllFilters = (state: RootState) => state.filters;

export default filterSlice.reducer;