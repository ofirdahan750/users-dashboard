import {
  createSlice,
  type PayloadAction,
  type Reducer,
} from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEY_SEARCH } from "constants";
import { localStorageUtil } from "utils";
import type { SearchState } from "types";

// load saved search from localStorage when app starts
const getInitialSearchTerm = (): string => {
  const savedSearch: string =
    localStorageUtil.get<string>(LOCAL_STORAGE_KEY_SEARCH) || ""; // get saved search from localStorage or empty string if not found
  localStorageUtil.set(LOCAL_STORAGE_KEY_SEARCH, savedSearch); // save search to localStorage
  return savedSearch; // return saved search or empty string
};

const initialState: SearchState = {
  searchTerm: getInitialSearchTerm(), // get initial search term from localStorage or empty string if not found
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // update search term and save to localStorage
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload; // update search term
      localStorageUtil.set(LOCAL_STORAGE_KEY_SEARCH, action.payload); // save search to localStorage
    },
    // clear search term and remove from localStorage
    clearSearchTerm: (state) => {
      state.searchTerm = ""; // clear search term
      localStorageUtil.set(LOCAL_STORAGE_KEY_SEARCH, ""); // reset search term value from localStorage
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;
export const searchReducer: Reducer<SearchState> = searchSlice.reducer;
