import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {
    freshNewMusic: [],
    singAlong: [],
    happy: [],
  },
  status: "idle",
  error: null,
};

export const fetchIndexPlayList = createAsyncThunk(
  "indexPlaylist/fetchIndexPlayList",
  async ({ apiKey }) => {
    const headers = {
      "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
      "X-RapidAPI-Key": apiKey,
    };

    const freshNewMusicResponse = await axios.get(
      "https://spotify81.p.rapidapi.com/search/?q=fresh%20new%20music&type=playlists&limit=20",
      { headers }
    );
    const freshNewMusicData = freshNewMusicResponse.data.playlists.items.filter(
      (item) => item.data.owner?.name === "Spotify"
    );

    const singAlongResponse = await axios.get(
      "https://spotify81.p.rapidapi.com/search/?q=sing%20along&type=playlists&limit=20",
      { headers }
    );
    const singAlongData = singAlongResponse.data.playlists.items.filter(
      (item) => item.data.owner?.name === "Spotify"
    );

    const happyResponse = await axios.get(
      "https://spotify81.p.rapidapi.com/search/?q=happy&type=playlists&limit=20",
      { headers }
    );
    const happyData = happyResponse.data.playlists.items.filter(
      (item) => item.data.owner?.name === "Spotify"
    );

    return {
      freshNewMusic: freshNewMusicData,
      singAlong: singAlongData,
      happy: happyData,
    };
  }
);

const indexPlaylistSlice = createSlice({
  name: "indexPlaylist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndexPlayList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIndexPlayList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchIndexPlayList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default indexPlaylistSlice.reducer;
