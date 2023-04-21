import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import axios from 'axios'
import AudioPlayer from '../components/AudioPlayer'

const SongScreen = ({ route }) => {
  const { track } = route.params
  const [songUrl, setSongUrl] = useState(null)
  const [details, setDetails] = useState(null)

  const getSong = async (track) => {
    const options = {
      method: 'GET',
      url:
        'https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud',
      params: { track },
      headers: {
        'X-RapidAPI-Key': 'f71f71d942mshd28daf9b4ebfb90p1c40d3jsnc8fe83d05f0e',
        'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com',
      },
    }

    console.log('sending request...')
    try {
      const { data } = await axios.request(options)
      console.log('response received!')
      const { soundcloudTrack, spotifyTrack } = data
      setSongUrl(soundcloudTrack.audio[0].url)
      setDetails(spotifyTrack)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getSong(track)
  }, [])

  return (
    <View className="items-center justify-center flex-1 bg-[#1C1B1B]">
      {songUrl && details ? (
        <AudioPlayer url={songUrl} details={details} />
      ) : (
        <Text>{songUrl ? '' : 'Loading...'}</Text>
      )}
    </View>
  )
}

export default SongScreen
