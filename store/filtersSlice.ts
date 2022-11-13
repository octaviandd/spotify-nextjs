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
}

export const filterSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    updateAccousticness: (state, action: PayloadAction<number[]>) => {
      state.acousticness = action.payload
    },
    updateDanceability: (state, action: PayloadAction<number[]>) => {
      state.danceability = action.payload
    },
    updateDuration: (state, action: PayloadAction<number[]>) => {
      state.duration = action.payload
    },
    updateEnergy: (state, action: PayloadAction<number[]>) => {
      state.energy = action.payload
    },
    updateInstrumentalness: (state, action: PayloadAction<number[]>) => {
      state.instrumentalness = action.payload
    },
    updateKey: (state, action: PayloadAction<number[]>) => {
      state.key = action.payload
    },
    updateLiveness: (state, action: PayloadAction<number[]>) => {
      state.liveness = action.payload
    },
    updateLoudness: (state, action: PayloadAction<number[]>) => {
      state.loudness = action.payload
    },
    updatePopularity: (state, action: PayloadAction<number[]>) => {
      state.popularity = action.payload
    },
    updateSpeechiness: (state, action: PayloadAction<number[]>) => {
      state.speechiness = action.payload
    },
    updateTempo: (state, action: PayloadAction<number[]>) => {
      state.tempo = action.payload
    },
    updateValence: (state, action: PayloadAction<number[]>) => {
      state.valence = action.payload
    },
  },
})

export const {
  updateAccousticness,
  updateDanceability,
  updateEnergy,
  updateInstrumentalness,
  updateKey,
  updateLoudness,
  updateSpeechiness,
  updatePopularity,
  updateTempo,
  updateDuration,
  updateValence,
} = filterSlice.actions

export const selectProperty = (state: RootState, property: string) =>
  state.filters[property]

export default filterSlice.reducer
