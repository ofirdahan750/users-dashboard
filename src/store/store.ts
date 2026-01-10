import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./usersSlice";
import { themeReducer } from "./themeSlice";
import { loadingReducer } from "./loadingSlice";
import { searchReducer } from "./searchSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer, // users reducer
    theme: themeReducer, // theme reducer
    loading: loadingReducer, // loading reducer
    search: searchReducer, // search reducer
  },
});
