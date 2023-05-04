import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchNewAlbums = createAsyncThunk(
  "newAlbums/fetchNewAlbums",
  async ({ apiKey }) => {
    const response = await axios.get(
      `https://spotify23.p.rapidapi.com/genre_view/`,
      {
        params: {
          id: "new-releases-bottom-composite",
          content_limit: "10",
          limit: "20",
        },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      }
    );

    console.log("fetched new albums");
    return response.data;
  }
);

const newAlbumsSlice = createSlice({
  name: "newAlbums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewAlbums.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewAlbums.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchNewAlbums.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default newAlbumsSlice.reducer;
