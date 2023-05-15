import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchTopArtists = createAsyncThunk(
  "topArtists/fetchTopArtists",
  async ({ apiKey }) => {
    const response = await axios.get(
      `https://spotify81.p.rapidapi.com/artists/`,
      {
        headers: {
          "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
          "X-RapidAPI-Key": apiKey,
        },
        params: {
          ids: "6eUKZXaKkcviH0Ku9w2n3V,66CXWjxzNUsdJxJ2JdwvnR,6qqNVTkY8uBg9cP3Jd7DAH,3TVXtAsR1Inumwj472S9r4,06HL4z0CvFAxyc27GXpf02,1uNFoZAHBGtllmzznpCI3s,7dGJo4pcD2V6oG8kP0tJRR,4q3ewBCX7sLwd24euuV69X,3Nrfpe0tUJi4K4DXYWgMUX,1Xyo4u8uXC1ZmMpatF05PJ,5pKCCKE2ajJHZ9KAiaK11H,4dpARuHxo51G3z768sgnrY,0du5cEVh5yTK9QJze8zA0C,53XhwfbYqKCa1cC15pYq2q,1dfeR4HaWDbWqFHLkxsg1d",
        },
      }
    );

    console.log("fetched top artists");
    return response.data;
  }
);

const topArtistsSlice = createSlice({
  name: "topArtists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopArtists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopArtists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTopArtists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default topArtistsSlice.reducer;
