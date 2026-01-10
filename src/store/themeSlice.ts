import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Theme } from "types";
import { THEME_LIGHT, THEME_DARK, LOCAL_STORAGE_KEY_THEME } from "constants";
import { localStorageUtil } from "utils";

const getInitialTheme = (): Theme => {
  const savedTheme = localStorageUtil.get<Theme>(LOCAL_STORAGE_KEY_THEME);
  
  if (savedTheme === THEME_LIGHT || savedTheme === THEME_DARK) {
    return savedTheme;
  }
  
  localStorageUtil.set(LOCAL_STORAGE_KEY_THEME, THEME_LIGHT);
  return THEME_LIGHT;
};

interface ThemeState {
  mode: Theme;
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.mode = action.payload;
      localStorageUtil.set(LOCAL_STORAGE_KEY_THEME, action.payload);
    },
    toggleTheme: (state) => {
      state.mode = state.mode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
      localStorageUtil.set(LOCAL_STORAGE_KEY_THEME, state.mode);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
