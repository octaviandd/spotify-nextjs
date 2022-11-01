import { configureStore } from "@reduxjs/toolkit"

const initialState = {
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

function acousticNessReducer(
  state = initialState.acousticness,
  action: { type: string },
  payload: any
) {
  if (action.type === "counter/increment") {
    return {
      ...state,
      acousticness: payload,
    }
  }
  return state
}

const store = configureStore({
  reducer: {
    acousticNess: acousticNessReducer,
    danceability: danceabilityReducer,
    duration: durationReducer,
    energy: energyReducer,
    instrumentalness: instrumentalnessReducer,
    key: keyReducer,
    liveness: livenessReducer,
    loudness: loudnessReducer,
    mode: modeReducer,
    popularity: popularityReducer,
    speechiness: speecinessReducer,
    tempo: tempoReducer,
    valence: valenceReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
