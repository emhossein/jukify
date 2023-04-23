import { Dimensions, Image, FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import throttle from '../utils/throttle'
import NewSongs from '../components/NewSongs'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const IndexScreen = () => {
  const [data, setData] = useState(null)
  const [singleTracks, setSingleTracks] = useState(null)

  const getNew = async () => {
    const response = await axios.get(
      'https://one-api.ir/spotify/?token=160224:642de2d715860&action=new',
    )
    setData(response.data)
    const singles = response.data.result.albums.items.filter(
      (item) => item.album_type === 'single',
    )
    setSingleTracks(singles)
  }

  const throttledData = throttle(getNew, 60000)
  useEffect(() => {
    throttledData()
    // getNew()
  }, [])

  return (
    <>
      {data && (
        <FlatList
          horizontal
          data={singleTracks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NewSongs item={item} />}
        />
      )}
    </>
  )
}

export default IndexScreen
