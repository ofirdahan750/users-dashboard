import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEY_SEARCH } from "../constants/store";
import { localStorageUtil } from "../utils/localStorage";

const getInitialSearchTerm = (): string => {
  const savedSearch = localStorageUtil.get<string>(LOCAL_STORAGE_KEY_SEARCH);
  
  if (typeof savedSearch === "string") {
    localStorageUtil.set(LOCAL_STORAGE_KEY_SEARCH, savedSearch);
    return savedSearch;
  }
  
  localStorageUtil.set(LOCAL_STORAGE_KEY_SEARCH, "");
  return "";
};

const initialState = {
  searchTerm: getInitialSearchTerm(),
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      localStorageUtil.set(LOCAL_STORAGE_KEY_SEARCH, action.payload);
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
      localStorageUtil.set(LOCAL_STORAGE_KEY_SEARCH, "");
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
