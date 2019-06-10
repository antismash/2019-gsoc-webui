import { createStore, combineReducers } from 'redux';

import ServerStats from '../Reducers/ServerStats';

let store = createStore(combineReducers({
  ServerStats
}));

export default store;