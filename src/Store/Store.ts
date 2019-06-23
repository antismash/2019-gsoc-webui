import { createStore, combineReducers } from 'redux';

import ServerStats from '../Reducers/ServerStats';
import ServerNews from '../Reducers/ServerNews';

let store = createStore(combineReducers({
  ServerStats,
  ServerNews,
}));

export default store;