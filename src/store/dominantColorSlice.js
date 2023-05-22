import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchDominantColors = createAsyncThunk(
  "dominantColors/fetchDominantColors",
  async ({ url }) => {
    const response = await axios.get(
      `https://jukify-back.vercel.app/api/colors?url=${url}`
    );

    return response.data;
  }
);

const dominantColorsSlice = createSlice({
  name: "dominantColors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDominantColors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDominantColors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDominantColors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dominantColorsSlice.reducer;
