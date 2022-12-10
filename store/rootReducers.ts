import { combineReducers } from 'redux';

import filtersReducer from './filtersSlice';
import searchReducer from './searchSlice';
import songReducer from './songSlice';

const rootReducer = combineReducers({
  filters: filtersReducer,
  search: searchReducer,
  song: songReducer,
});

export default rootReducer;
