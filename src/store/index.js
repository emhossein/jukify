import { configureStore } from "@reduxjs/toolkit";
import audioPlayerReducer from "./audioPlayerSlice";
import tthReducer from "./tthSlice";
import songReducer from "./songDataSlice";

const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
    tth: tthReducer,
    song: songReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
