import {combineReducers, createStore} from 'redux';
import touristReducer from './reducers/touristReducer';
import filterReducer from "./reducers/filterReducer";

const store = createStore(combineReducers({
    tourist: touristReducer,
    filter: filterReducer
}));

export default store;
