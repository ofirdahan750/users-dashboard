import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEY_SEARCH } from "constants";
import { localStorageUtil } from "utils";

// load saved search from localStorage when app starts
const getInitialSearchTerm = (): string => {
  const savedSearch: string =
    localStorageUtil.get<string>(LOCAL_STORAGE_KEY_SEARCH) || "";
  localStorageUtil.set(LOCAL_STORAGE_KEY_SEARCH, savedSearch);
  return savedSearch;
};

const initialState = {
  searchTerm: getInitialSearchTerm(),
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // update search term and save to localStorage
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      localStorageUtil.set(LOCAL_STORAGE_KEY_SEARCH, action.payload);
    },
    // clear search term and remove from localStorage
    clearSearchTerm: (state) => {
      state.searchTerm = "";
      localStorageUtil.set(LOCAL_STORAGE_KEY_SEARCH, "");
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
