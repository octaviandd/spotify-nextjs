import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducers"

const store = configureStore({
  reducer: rootReducer,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
