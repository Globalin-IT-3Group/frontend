import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "redux";

// 1. 리듀서 합치기
const rootReducer = combineReducers({
  auth: authReducer,
});

// 2. persist 설정
const persistConfig = {
  key: "root",
  storage,
};

// 3. persist reducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. store 생성
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist 관련 액션들 무시
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. persistor 생성
export const persistor = persistStore(store);
