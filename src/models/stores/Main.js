import { combineReducers, createStore } from 'redux';
import alertStore from './Alerts';

const rootReducer = combineReducers({
  'alertStore': alertStore.reducer(),
});

const store = createStore(rootReducer);

export default store;
