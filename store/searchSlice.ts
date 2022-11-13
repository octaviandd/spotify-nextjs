import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState } from "../store"

const initialState: searchInitialState = {
  search: "",
  status: false,
}
interface searchInitialState {
  search: string
  status: boolean | string
}

export const searchSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const { updateSearch } = searchSlice.actions

export const selectSearch = (state: RootState) => state.search

export default searchSlice.reducer
