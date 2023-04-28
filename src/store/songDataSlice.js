import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSong = createAsyncThunk(
  "song/fetchSong",
  async (track, apiKey, apiHost) => {
    const options = {
      method: "GET",
      url: "https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud",
      params: { track, quality: "sq" },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost,
        "content-type": "application/octet-stream",
      },
    };

    console.log("sending request...");
    try {
      const { data } = await axios.request(options);
      console.log("response received!");
      const { soundcloudTrack, spotifyTrack } = data;
      return { songUrl: soundcloudTrack.audio[0].url, details: spotifyTrack };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const songSlice = createSlice({
  name: "song",
  initialState: {
    songUrl: null,
    details: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSong.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchSong.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.songUrl = action.payload.songUrl;
        state.details = action.payload.details;
      })
      .addCase(fetchSong.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      });
  },
});

export default songSlice.reducer;
