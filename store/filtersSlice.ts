import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

const initialState: filtersInitialState = {
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
}

interface IObjectKeys {
  [key: string]: number[]
}

interface filtersInitialState extends IObjectKeys {
  acousticness: number[]
  danceability: number[]
  duration: number[]
  energy: number[]
  instrumentalness: number[]
  key: number[]
  liveness: number[]
  loudness: number[]
  popularity: number[]
  speechiness: number[]
  tempo: number[]
  valence: number[]
  mode: number[]
}

export const filterSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    updateValue: (
      state,
      action: PayloadAction<{ values: number[]; type: string }>
    ) => {
      state[action.payload.type] = action.payload.values
    },
  },
})

export const { updateValue } = filterSlice.actions

export const selectProperty = (state: RootState, property: string) =>
  state.filters[property]

export default filterSlice.reducer
