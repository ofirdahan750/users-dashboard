import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Theme, ThemeState } from "types";
import { THEME_LIGHT, THEME_DARK, LOCAL_STORAGE_KEY_THEME } from "constants";
import { localStorageUtil } from "utils";

// check if value is a valid Theme type
const isValidTheme = (value: string): boolean => {
  return value === THEME_LIGHT || value === THEME_DARK;
};

// load saved theme from localStorage when app starts
const getInitialTheme = (): Theme => {
  const savedTheme: string =
    localStorageUtil.get<string>(LOCAL_STORAGE_KEY_THEME) || ""; // get saved theme from localStorage or empty string if not found

  if (isValidTheme(savedTheme)) { // if saved theme is valid, return it
    return savedTheme as Theme; // cast saved theme to Theme type
  } else {
    localStorageUtil.set(LOCAL_STORAGE_KEY_THEME, THEME_LIGHT); // if saved theme is not valid, set default theme to light
    return THEME_LIGHT; // return default theme
  }
};

const initialState: ThemeState = {
  mode: getInitialTheme(), // get initial theme from localStorage or set default theme to light
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.mode = action.payload;
      localStorageUtil.set(LOCAL_STORAGE_KEY_THEME, action.payload); // save theme to localStorage
    },
    toggleTheme: (state) => {
      state.mode = state.mode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT; // toggle theme between light and dark
      localStorageUtil.set(LOCAL_STORAGE_KEY_THEME, state.mode); // save theme to localStorage
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
