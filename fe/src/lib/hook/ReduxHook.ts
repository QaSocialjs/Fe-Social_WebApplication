import { AppDispatch, AppThunkDispatch } from "@lib/redux/Store";
import { useDispatch } from "react-redux";
export const hookDispatch = () => useDispatch<AppDispatch>();
export const hookDispatchThunk = () => useDispatch<AppThunkDispatch>();
