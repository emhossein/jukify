import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  playlistDetails: null,
  status: "idle",
  error: null,
};

export const fetchPlaylistDetails = createAsyncThunk(
  "playlist/fetchPlaylistDetails",
  async ({ oneKey, playlistId }) => {
    const response = await axios.get(
      `https://one-api.ir/spotify/?token=${oneKey}&action=playlists&id=${playlistId}`
    );

    return response.data;
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylistDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlaylistDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.playlistDetails = action.payload;
      })
      .addCase(fetchPlaylistDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default playlistSlice.reducer;
