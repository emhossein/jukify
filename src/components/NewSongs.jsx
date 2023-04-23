import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const NewSongs = ({ item }) => {
  return (
    <View
      className="mr-[14px]"
      style={{
        width: SCREEN_WIDTH * 0.3,
      }}
      key={item.id}
    >
      <Image
        source={{ uri: item.images[0].url }}
        style={{
          width: SCREEN_WIDTH * 0.3,
          height: SCREEN_HEIGHT * 0.22,
          borderRadius: 30,
        }}
      />
      <View className="ml-3">
        <Text className="">{item.name}</Text>
        <Text className="">{item.artists[0].name}</Text>
      </View>
    </View>
  )
}

export default NewSongs
