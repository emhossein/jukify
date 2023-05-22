import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "", token: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    deleteUser: (state) => {
      state.name = null;
    },
    deleteToken: (state) => {
      state.token = null;
    },
  },
});

export const { setUser, deleteUser, setToken, deleteToken } = userSlice.actions;

export default userSlice.reducer;
