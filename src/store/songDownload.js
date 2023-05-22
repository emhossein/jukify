import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const downloadSong = createAsyncThunk(
  "download/download",
  async ({ artist, track, apiKey, oneKey }) => {
    if (artist === null || track === null) return;

    const headers = {
      "X-RapidAPI-Host": "soundcloud-downloader4.p.rapidapi.com",
      "X-RapidAPI-Key": apiKey,
    };

    const searchParams = {
      query: `${artist} - ${track}`,
    };

    const searchResponse = await axios.get(
      "https://soundcloud-downloader4.p.rapidapi.com/soundcloud/search",
      { headers, params: searchParams }
    );

    const downloadResponse = await axios.get(
      `https://one-api.ir/soundcloud/?token=${oneKey}&action=download&link=${searchResponse.data.result[0].url}`
    );

    return downloadResponse.data;
  }
);

export const songSlice = createSlice({
  name: "download",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(downloadSong.pending, (state) => {
        state.status = "loading";
      })
      .addCase(downloadSong.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(downloadSong.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default songSlice.reducer;
