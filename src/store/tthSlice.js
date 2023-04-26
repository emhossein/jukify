import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTTH = createAsyncThunk("tth/fetchTTH", async (apiKey) => {
  const response = await axios.get(
    `https://one-api.ir/spotify/?token=${apiKey}&action=playlists&id=37i9dQZF1DXcBWIGoYBM5M`
  );
  console.log("fetched TTH");
  return response.data;
});

const tthSlice = createSlice({
  name: "tth",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTTH.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTTH.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTTH.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default tthSlice.reducer;
