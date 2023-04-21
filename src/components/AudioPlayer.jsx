import { Audio } from 'expo-av'
import React, { useState, useEffect, useCallback } from 'react'
import { View, TouchableOpacity, Text, Dimensions, Image } from 'react-native'
import Slider from '@react-native-community/slider'

import Hicon from './icons/Hicon'
import PauseIcon from './icons/PauseIcon'
import PlayIcon from './icons/PlayIcon'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const AudioPlayer = ({ url, details }) => {
  const [sound, setSound] = useState(null)
  const [duration, setDuration] = useState(0)
  const [position, setPosition] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let isMounted = true
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri: url })
        const status = await sound.getStatusAsync()
        if (isMounted) {
          setSound(sound)
          setDuration(status.durationMillis)
          setPosition(status.positionMillis)
          await sound.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate)
        }
      } catch (error) {
        console.error(error)
      }
    }
    loadSound()
    return () => {
      isMounted = false
      if (sound) {
        sound.unloadAsync()
      }
    }
  }, [url])

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setPosition((prevPosition) => prevPosition + 1000)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  useEffect(() => {
    if (isPlaying && position >= duration) {
      setIsPlaying(false)
    }
  }, [position, duration, isPlaying])

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying)
      setPosition(status.positionMillis)
    }
  }

  const handlePlayPause = async () => {
    if (!sound) {
      return
    }
    if (isPlaying) {
      await sound.pauseAsync()
    } else {
      await sound.playAsync()
    }
  }

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleSeek = useCallback(
    async (value) => {
      if (sound) {
        await sound.setPositionAsync(value)
        setPosition(value)
      }
    },
    [sound],
  )
  return (
    <View>
      <Image
        source={{ uri: details.album.cover[2].url }}
        style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_HEIGHT * 0.44 }}
        className="rounded-[30px]"
      />
      <View className="mt-[17px] mb-[50px] flex-row items-center justify-between">
        <View>
          <Text className="text-[#DFDFDF] text-xl mb-[6px]">
            {details.name}
          </Text>
          <Text className="text-[#BABABA] text-xl">
            {details.artists[0].name}
          </Text>
        </View>
        <Hicon />
      </View>

      <Slider
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={handleSeek}
        thumbImage={require('../../assets/Ellipse.png')}
        thumbTintColor="#B7B7B7"
        minimumTrackTintColor="#B7B7B7"
        maximumTrackTintColor="rgba(136, 136, 136, 0.3)"
        style={{ width: SCREEN_WIDTH * 0.8 }}
      />
      <View className="flex-row items-center justify-between">
        <Text className="text-[#878787] text-xs">
          {formatDuration(position)}
        </Text>
        <Text className="text-[#878787] text-xs">
          {formatDuration(duration)}
        </Text>
      </View>
      <View className="flex-row items-center justify-center">
        <TouchableOpacity onPress={handlePlayPause}>
          <View className="w-[72px] h-[72px] rounded-full bg-[#42C83C] items-center justify-center">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AudioPlayer
