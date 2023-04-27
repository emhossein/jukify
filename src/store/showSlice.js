import { createSlice } from "@reduxjs/toolkit";

export const showSlice = createSlice({
  name: "showSlice",
  initialState: {
    shown: false,
  },
  reducers: {
    show: (state) => {
      state.shown = true;
    },
    hide: (state) => {
      state.shown = false;
    },
    toggle: (state) => {
      state.shown = !state.shown;
    },
  },
});

export const { show, hide, toggle } = showSlice.actions;

export default showSlice.reducer;
