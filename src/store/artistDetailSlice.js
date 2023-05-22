import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchArtistDetail = createAsyncThunk(
  "artistDetail/fetchArtistDetail",
  async ({ apiKey, id }) => {
    const response = await axios.get(
      `https://spotify81.p.rapidapi.com/artist_overview`,
      {
        headers: {
          "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
          "X-RapidAPI-Key": apiKey,
        },
        params: {
          id: id,
        },
      }
    );

    return response.data;
  }
);

const artistDetailSlice = createSlice({
  name: "artistDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArtistDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchArtistDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default artistDetailSlice.reducer;
