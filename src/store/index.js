import { configureStore } from "@reduxjs/toolkit";

import tthReducer from "./tthSlice";
import showSlice from "./showSlice";
import dlReducer from "./songDownload";
import lyricsSlice from "./lyricsSlice";
import songReducer from "./songDataSlice";
import audioPlayerReducer from "./audioPlayerSlice";

const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
    tth: tthReducer,
    song: songReducer,
    download: dlReducer,
    show: showSlice,
    lyrics: lyricsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
