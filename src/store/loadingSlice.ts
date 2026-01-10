import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "store";

const initialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // request started, show loading
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      // request finished successfully, hide loading
      .addCase(fetchUsers.fulfilled, (state) => {
        state.isLoading = false;
      })
      // request failed, hide loading
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const loadingReducer = loadingSlice.reducer;
