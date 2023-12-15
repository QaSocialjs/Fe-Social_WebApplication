import { AppDispatch, AppThunkDispatch, RootState } from "@lib/redux/Store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const hookDispatch = () => useDispatch<AppDispatch>();
export const hookDispatchThunk = () => useDispatch<AppThunkDispatch>();
