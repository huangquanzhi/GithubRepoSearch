import { combineReducers } from 'redux';

import search from './search';
import states from './states';

const rootReducer = combineReducers({ search, states });

export default rootReducer;