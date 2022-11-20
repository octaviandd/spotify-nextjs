import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

const initialState: filtersInitialState = {
  seeds: {
    seed_artists: [],
    seed_genres: [],
    seed_tracks: [],
  },
  filters: {
    acousticness: [0, 100],
    danceability: [0, 100],
    duration: [0, 100],
    energy: [0, 100],
    instrumentalness: [0, 100],
    key: [0, 100],
    liveness: [0, 100],
    loudness: [0, 100],
    popularity: [0, 100],
    speechiness: [0, 100],
    tempo: [0, 100],
    valence: [0, 100],
    mode: [0, 100],
  },
}
interface filtersInitialState {
  seeds: {
    [key: string]: object[]
  }
  filters: {
    [key: string]: number[]
  }
}

export const filterSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    updateRangeSliders: (
      state,
      action: PayloadAction<{ values: number[]; type: string }>
    ) => {
      state.filters[action.payload.type] = action.payload.values
    },
    updateMultiSelect: (state, action: PayloadAction<{values: object[]; type: string}>) => {
      state.seeds[action.payload.type].push(action.payload.values)
    }
  },
})

export const { updateRangeSliders, updateMultiSelect } = filterSlice.actions

export const selectProperty = (state: RootState, property: string) =>
  state.filters.filters[property]

export const selectAllFilters = (state: RootState) => state.filters

export default filterSlice.reducer
