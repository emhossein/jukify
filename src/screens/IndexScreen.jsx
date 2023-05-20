import React, { useEffect, useCallback } from 'react'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import {
  FlatList,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
} from 'react-native'
import { StackActions } from '@react-navigation/native'

import { fetchTTH } from '../store/tthSlice'
import Typography from '../components/Typography'
import PlayList from '../components/Index/PlayLists/PlayList'
import { fetchIndexPlayList } from '../store/indexPlaylistSlice'

import { ONE_TOKEN, RAPIDAPI_KEY } from '@env'
import TodayHitsButton from '../components/Index/TodayHitsButton'
import { fetchNewAlbums } from '../store/newAlbumsSlice'
import NewAlbum from '../components/Album/Album'
import { fetchTopArtists } from '../store/topArtistsSlice'
import Artist from '../components/Artist/Artist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteUser, setUser } from '../store/userSlice'
import { Colors, Sizing, Utils } from '../styles'
import stateOfDay from '../utils/stateOfDay'

const IndexScreen = ({ navigation }) => {
  const android = Platform.OS === 'android'

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@token')
      dispatch(deleteUser())
    } catch (e) {
      console.log(e)
    }
    console.log('time expired')
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if (value !== null) {
        dispatch(setUser(jwt_decode(value)))
        console.log('user logged in.')
      } else {
        navigation.dispatch(StackActions.replace('Auth'))
        console.log('no token found, please login.')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const dispatch = useDispatch()
  const { data: tth, status: tthStatus } = useSelector((state) => state.tth)
  const { data: newAlbums } = useSelector((state) => state.newAlbums)
  const { data: artists } = useSelector((state) => state.topArtists)
  const { data, status } = useSelector((state) => state.indexPlaylist)
  const { shown } = useSelector((state) => state.show)
  const user = useSelector((state) => state.user)

  const tthButtonCover = tth?.result?.tracks?.items
    ?.slice(0, 3)
    .map((item) => item.track.album.images[0].url)

  useEffect(() => {
    getData()

    // if (__DEV__) {
    //   if (!tth || !data || !newAlbums || !artists) {
    //     dispatch(fetchTTH(ONE_TOKEN))
    //     dispatch(fetchNewAlbums({ apiKey: RAPIDAPI_KEY }))
    //     dispatch(fetchIndexPlayList({ apiKey: RAPIDAPI_KEY }))
    //     dispatch(fetchTopArtists({ apiKey: RAPIDAPI_KEY }))
    //   }
    // } else {
    //   dispatch(fetchTTH(ONE_TOKEN))
    //   dispatch(fetchNewAlbums({ apiKey: RAPIDAPI_KEY }))
    //   dispatch(fetchIndexPlayList({ apiKey: RAPIDAPI_KEY }))
    //   dispatch(fetchTopArtists({ apiKey: RAPIDAPI_KEY }))
    // }
  }, [])

  // removeValue();

  useFocusEffect(
    useCallback(() => {
      if (
        user !== null &&
        new Date().getTime() > new Date(user?.exp * 1000).getTime()
      ) {
        removeValue()
        navigation.dispatch(StackActions.replace('Auth'))
      } else {
        console.log(new Date(user?.exp * 1000).toLocaleString())
        console.log(
          'expired? ',
          new Date().getTime() > new Date(user?.exp * 1000).getTime(),
        )
      }
    }, []),
  )

  return (
    <SafeAreaView
      style={{ paddingTop: android ? 25 : 0 }}
      className="bg-main flex-1"
    >
      <View style={style.header}>
        <Typography style={style.headerGreet}>
          {stateOfDay()} {user?.name}!
        </Typography>
        <Image
          source={require('../../assets/Spotify-logo-dark.png')}
          style={style.headerLogo}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {tthStatus === 'succeeded' && (
          <View className="ml-[10%] mb-6">
            <Typography bold styles="text-white text-xl mb-3 ">
              Today&apos;s Top Hits
            </Typography>
            <TodayHitsButton images={tthButtonCover} />
          </View>
        )}
        {status === 'succeeded' && (
          <View className="ml-[10%]" style={{ marginBottom: !shown ? 65 : 0 }}>
            <Typography bold styles="text-white text-base -mb-4">
              Recommended for you
            </Typography>
            {newAlbums && (
              <>
                <Typography styles="text-white text-base mb-3 mt-5">
                  New Albums
                </Typography>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={newAlbums?.content?.items}
                  keyExtractor={(item) => item?.id}
                  renderItem={({ item }) => <NewAlbum item={item} />}
                />
              </>
            )}
            <PlayList title="Fresh New Musics" data={data.freshNewMusic} />
            <PlayList title="Sing Along" data={data.singAlong} />
            <PlayList title="Happy" data={data.happy} />
            <Typography styles="text-white text-base mb-3 mt-5">
              Popular Artists
            </Typography>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={artists?.artists}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => <Artist item={item} />}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default IndexScreen

const style = StyleSheet.create({
  header: {
    width: Sizing.screenBase.width,
    alignSelf: 'center',
    ...Utils.flexRow,
    justifyContent: 'space-between',
  },
  headerLogo: {
    ...Sizing.logoSize,
  },
  headerGreet: {
    color: Colors.neutral.white,
    fontSize: 19,
  },
})
