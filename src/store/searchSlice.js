import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

export const searchSpotify = createAsyncThunk(
  "searchData/searchSpotify",
  async ({ apiKey, term }) => {
    const response = await axios.get(
      `https://spotify81.p.rapidapi.com/search`,
      {
        params: {
          q: term,
          type: "multi",
          offset: "0",
          limit: "20",
          numberOfTopResults: "5",
        },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
        },
      }
    );

    return response.data;
  }
);

const searchDataSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchSpotify.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchSpotify.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(searchSpotify.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default searchDataSlice.reducer;
