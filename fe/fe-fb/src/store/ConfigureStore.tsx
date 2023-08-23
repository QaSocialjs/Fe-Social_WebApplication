import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.tsx";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
