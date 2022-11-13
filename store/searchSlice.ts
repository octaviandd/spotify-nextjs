import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState } from "../store"

export const fetchSongs = createAsyncThunk("search/updateSearch", async () => {
  const response = await client.get("/fakeApi/todos")
  return response.todos
})

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        const newEntities = {}
        // action.payload.forEach((todo) => {
        //   newEntities[todo.id] = todo
        // })
        // state.entities = newEntities
        state.status = "idle"
      })
  },
})

export const { updateSearch } = searchSlice.actions

export const selectSearch = (state: RootState) => state.search

export default searchSlice.reducer
