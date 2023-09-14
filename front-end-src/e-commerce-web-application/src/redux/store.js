import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userIdReducer from './slices/userIdSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import searchOutcomeReducer from './slices/searchOutcomeSlice';

const persistConfig = {
  key: 'root',
  storage,
};

let rootReducer = combineReducers({
  userId: userIdReducer,
  searchOutcome: searchOutcomeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
  reducer: persistedReducer,
});

export default store;
