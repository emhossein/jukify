import { configureStore } from "@reduxjs/toolkit";

import tthReducer from "./tthSlice";
import showReducer from "./showSlice";
import dlReducer from "./songDownload";
import lyricsReducer from "./lyricsSlice";
import audioPlayerReducer from "./audioPlayerSlice";
import indexPlaylistReducer from "./indexPlaylistSlice";
import playlistReducer from "./playlistDetailSlice";

const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
    tth: tthReducer,
    download: dlReducer,
    show: showReducer,
    lyrics: lyricsReducer,
    indexPlaylist: indexPlaylistReducer,
    playlist: playlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
