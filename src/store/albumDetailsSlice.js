import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchAlbumDetails = createAsyncThunk(
  "albumDetails/fetchAlbumDetails",
  async ({ oneKey, id }) => {
    const response = await axios.get(
      `https://one-api.ir/spotify/?token=${oneKey}&action=album&id=${id}`
    );

    console.log("fetched album details");
    return response.data;
  }
);

const albumDetailsSlice = createSlice({
  name: "albumDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAlbumDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAlbumDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default albumDetailsSlice.reducer;
