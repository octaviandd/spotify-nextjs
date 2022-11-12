import { combineReducers } from 'redux'

import filtersReducer from "./filters-slice";
import searchReducer from "./search-slice";

const rootReducer = combineReducers({
  filters: filtersReducer,
  search: searchReducer
})

export default rootReducer