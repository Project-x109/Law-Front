import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './reducers/authReducer';
import { issueReducer } from './reducers/issueReducer';
const persistConfig = {
  key: 'root',
  storage,
};
const rootReducer = combineReducers({
  auth: authReducer,
  issue: issueReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
