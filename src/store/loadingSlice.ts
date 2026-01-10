import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "store";
import type { LoadingState } from "types";

const initialState: LoadingState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchUsers request started, show loading
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      // fetchUsers request finished successfully, hide loading
      .addCase(fetchUsers.fulfilled, (state) => {
        state.isLoading = false;
      })
      // fetchUsers request failed, hide loading
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const loadingReducer = loadingSlice.reducer;
