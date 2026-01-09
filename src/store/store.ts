import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./usersSlice";
import { themeReducer } from "./themeSlice";
import { loadingReducer } from "./loadingSlice";
import { searchReducer } from "./searchSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    theme: themeReducer,
    loading: loadingReducer,
    search: searchReducer,
  },
});

