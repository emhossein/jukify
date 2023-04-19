import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";

const AudioPlayer = ({ url }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackInstance = useRef(null);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
    }
  };

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri: url });
        setSound(sound);
        playbackInstance.current = sound;
        await sound.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
      } catch (error) {
        console.error(error);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [url]);

  const handlePlayPause = async () => {
    if (!playbackInstance.current) {
      return;
    }

    if (isPlaying) {
      await playbackInstance.current.pauseAsync();
    } else {
      await playbackInstance.current.playAsync();
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePlayPause}>
        <Text>{isPlaying ? "Pause" : "Play"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AudioPlayer;
