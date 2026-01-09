import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../types/store";

// dispatch actions with types
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

// get state with types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

