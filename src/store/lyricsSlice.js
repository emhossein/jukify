import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLyrics = createAsyncThunk(
  "lyrics/fetchLyrics",
  async ({ artist, title }) => {
    const response = await axios.get(
      `https://some-random-api.ml/lyrics?title=${artist + " _ " + title}`
    );

    return response.data;
  }
);

const lyricsSlice = createSlice({
  name: "lyrics",
  initialState: {
    lyrics: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLyrics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLyrics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lyrics = action.payload;
      })
      .addCase(fetchLyrics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default lyricsSlice.reducer;
