import { configureStore } from "@reduxjs/toolkit"

const initialState = {
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
  },
  search: '',
}

export default function appReducer(state = initialState, action){
  switch(action.type){
    case 'changeAccousticness':
      return {
        ...state,
        filters: {
          ...state.filters,
          acousticness: action.payload
        }
      }
    default:
      return state
  }
}


const store = configureStore(appReducer)

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
