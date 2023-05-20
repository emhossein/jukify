import { StyleSheet, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { Colors, FontStyles, Outlines, Sizing, Utils } from '../styles'
import Typography from '../components/Typography'
import { useSelector } from 'react-redux'
import UserIcon from '../components/icons/UserIcon'

const UserScreen = () => {
  const { name } = useSelector((state) => state.user)

  return (
    <SafeAreaView style={style.container}>
      <View style={style.avatarContainer}>
        <View style={style.avatar}>
          {/* <UserIcon iconColor={Colors.neutral.s200} /> */}
          <Typography bold style={style.avatarText}>
            {name[0].toUpperCase()}
          </Typography>
        </View>
      </View>
      <Typography bold style={style.username}>
        {name}
      </Typography>
    </SafeAreaView>
  )
}

export default UserScreen

const style = StyleSheet.create({
  container: {
    ...Utils.container,
  },
  username: {
    color: Colors.neutral.white,
    fontSize: 16,
  },
  avatarContainer: {
    ...Utils.center,
    width: Sizing.x70,
    height: Sizing.x70,
    backgroundColor: Colors.primary.brand,
    borderRadius: Outlines.borderRadius.max,
  },
  avatar: {
    ...Utils.center,
    width: '95%',
    height: '95%',
    backgroundColor: Colors.background.accent,
    borderRadius: Outlines.borderRadius.max,
  },
  avatarText: {
    color: Colors.neutral.white,
    fontSize: 24,
  },
})
