import { combineReducers } from 'redux';
import filtersReducer from './filtersSlice';
import searchReducer from './searchSlice';
import songReducer from './songSlice';
import marketsReducer from './marketsSlice';


const rootReducer = combineReducers({
  filters: filtersReducer,
  search: searchReducer,
  song: songReducer,
  markets: marketsReducer,
});

export default rootReducer;
