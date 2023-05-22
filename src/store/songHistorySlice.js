import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@env";

export const sendHistory = createAsyncThunk(
  "songHistory/sendHistory",
  async ({ song, artist, image, token }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/songlist`,
        {
          songs: [
            {
              song,
              artist,
              image,
            },
          ],
        },
        {
          headers: { Authorization: token },
        }
      );

      return response.data.message;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getHistory = createAsyncThunk(
  "songHistory/getHistory",
  async ({ id, token }) => {
    try {
      const response = await axios.get(`${BASE_URL}/songlist?id=${id}`, {
        headers: { Authorization: token },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const songListSlice = createSlice({
  name: "songHistory",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(sendHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default songListSlice.reducer;
