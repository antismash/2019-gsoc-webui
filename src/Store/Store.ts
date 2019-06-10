import { createStore } from 'redux';

import counter from '../Reducers/Counter';

let store = createStore(counter);
export default store;