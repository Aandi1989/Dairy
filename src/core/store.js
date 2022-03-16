import { tasksReducer } from "./reducers";
import { combineReducers,createStore,applyMiddleware } from "redux";
import thunk from 'redux-thunk';

const reducers=combineReducers({
    tasksReducer
})

const store=createStore(reducers,applyMiddleware(thunk))

export default store
