import { combineReducers } from "redux"

import filtersReducer from "./filtersSlice"
import searchReducer from "./searchSlice"

const rootReducer = combineReducers({
  filters: filtersReducer,
  search: searchReducer,
})

export default rootReducer
