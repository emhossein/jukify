import { configureStore } from "@reduxjs/toolkit";
import audioPlayerReducer from "./audioPlayerSlice";
import tthReducer from "./tthSlice";
import songReducer from "./songDataSlice";
import dlReducer from "./songDownload";
import showSlice from "./showSlice";

const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
    tth: tthReducer,
    song: songReducer,
    download: dlReducer,
    show: showSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
