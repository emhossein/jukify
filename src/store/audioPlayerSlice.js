import { createSlice } from "@reduxjs/toolkit";
import { Audio } from "expo-av";

const initialState = {
  sound: null,
  uri: null,
  duration: 0,
  position: 0,
  isPlaying: false,
  artist: null,
  title: null,
  musicImage: null,
  musicDetails: null,
};

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    setSound(state, action) {
      state.sound = action.payload;
    },
    setUri(state, action) {
      state.uri = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    setPosition(state, action) {
      state.position = action.payload;
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    setArtist(state, action) {
      state.artist = action.payload;
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setMusicImage(state, action) {
      state.musicImage = action.payload;
    },
    setMusicDetails(state, action) {
      state.musicDetails = action.payload;
    },
    stopSound(state) {
      if (state.sound) {
        state.sound.stopAsync();
        state.sound.unloadAsync();
        state.sound = null;
      }
      state.uri = null;
      state.duration = 0;
      state.position = 0;
      state.isPlaying = false;
      state.musicDetails = null;
    },
  },
});

export const {
  setSound,
  setUri,
  setDuration,
  setPosition,
  setIsPlaying,
  stopSound,
  setTitle,
  setArtist,
  setMusicImage,
  setMusicDetails,
} = audioPlayerSlice.actions;

export const loadSound = (url) => async (dispatch, getState) => {
  const { sound } = getState().audioPlayer;
  if (sound) {
    dispatch(stopSound());
  }
  try {
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true }
    );
    const status = await newSound.getStatusAsync();
    dispatch(setSound(newSound));
    dispatch(setUri(url));
    dispatch(setDuration(status.durationMillis));
    dispatch(setPosition(status.positionMillis));
    await newSound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.isLoaded) {
        dispatch(setIsPlaying(status.isPlaying));
        dispatch(setPosition(status.positionMillis));

        if (status.didJustFinish) {
          // Song duration reached, stop the current sound and load a new one
          await newSound.stopAsync();
          dispatch(stopSound());
          dispatch(loadSound(url));
        }
      }
    });
  } catch (error) {}
};

export const playPause = () => async (dispatch, getState) => {
  const { sound, isPlaying } = getState().audioPlayer;
  if (!sound) {
    return;
  }
  if (isPlaying) {
    await sound.pauseAsync();
  } else {
    await sound.playAsync();
  }
  dispatch(setIsPlaying(!isPlaying));
};

export const seek = (value) => async (dispatch, getState) => {
  const { sound } = getState().audioPlayer;
  if (sound) {
    await sound.setPositionAsync(value);
    dispatch(setPosition(value));
  }
};

export const selectAudioPlayer = (state) => state.audioPlayer;

export default audioPlayerSlice.reducer;
