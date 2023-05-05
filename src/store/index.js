import { configureStore } from "@reduxjs/toolkit";

import tthReducer from "./tthSlice";
import showReducer from "./showSlice";
import dlReducer from "./songDownload";
import searchReducer from "./searchSlice";
import lyricsReducer from "./lyricsSlice";
import newAlbumsReducer from "./newAlbumsSlice";
import topArtistsReducer from "./topArtistsSlice";
import playlistReducer from "./playlistDetailSlice";
import audioPlayerReducer from "./audioPlayerSlice";
import artistDetailReducer from "./artistDetailSlice";
import albumDetailsReducer from "./albumDetailsSlice";
import indexPlaylistReducer from "./indexPlaylistSlice";

const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
    tth: tthReducer,
    download: dlReducer,
    show: showReducer,
    lyrics: lyricsReducer,
    indexPlaylist: indexPlaylistReducer,
    playlist: playlistReducer,
    newAlbums: newAlbumsReducer,
    albumDetails: albumDetailsReducer,
    topArtists: topArtistsReducer,
    artistDetail: artistDetailReducer,
    searchData: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
