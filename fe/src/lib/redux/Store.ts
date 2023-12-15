import { Action, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import UserSlice from "./user/UserSlice";

export const store = configureStore({
  reducer: UserSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, Action>;
