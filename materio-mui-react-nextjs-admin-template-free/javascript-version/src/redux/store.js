import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { issueReducer } from "./reducers/issueReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  issue: issueReducer

});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
