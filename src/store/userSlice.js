import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    deleteUser: (state) => {
      return (state.initialState = null);
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
