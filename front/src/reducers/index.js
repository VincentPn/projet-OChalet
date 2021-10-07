import { combineReducers } from 'redux';

import userReducer from './user';
import offersReducer from './offers';

const rootReducer = combineReducers({
  user: userReducer,
  offers: offersReducer,
});

export default rootReducer;
