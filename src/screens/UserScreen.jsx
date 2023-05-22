import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import { Colors, Outlines, Sizing, Utils } from "../styles";
import Typography from "../components/Typography";
import { useDispatch, useSelector } from "react-redux";
import UserIcon from "../components/icons/UserIcon";
import { getHistory } from "../store/songHistorySlice";
import UserTrack from "../components/User/UserTrack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const UserScreen = () => {
  const dispatch = useDispatch();
  const { name, token } = useSelector((state) => state.user);
  const { data: history } = useSelector((state) => state.history);

  useFocusEffect(
    useCallback(() => {
      dispatch(getHistory({ id: name.userId, token }));
    }, [])
  );

  return (
    <View style={style.container}>
      <View style={style.containerAvatar}>
        <View style={style.avatarContainer}>
          <View style={style.avatar}>
            <UserIcon iconColor={Colors.neutral.s200} />
          </View>
        </View>
        <Typography bold style={style.username}>
          {name.name}
        </Typography>
      </View>
      <View style={style.songContainer}>
        <Typography styles="text-white text-base mb-3 mt-5 ml-[5%]">
          {history ? " History" : "Loading your history"}
        </Typography>

        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <UserTrack item={item.songs} />}
        />
      </View>
    </View>
  );
};

export default UserScreen;

const style = StyleSheet.create({
  container: {
    ...Utils.container,
  },
  username: {
    color: Colors.neutral.white,
    fontSize: 16,
    marginTop: 10,
    textTransform: "capitalize",
  },
  containerAvatar: {
    height: Sizing.screen.height * 0.3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background.accent,
    borderBottomLeftRadius: Outlines.borderRadius.large,
    borderBottomRightRadius: Outlines.borderRadius.large,
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
    width: "95%",
    height: "95%",
    backgroundColor: Colors.background.accent,
    borderRadius: Outlines.borderRadius.max,
  },
  avatarText: {
    color: Colors.neutral.white,
    fontSize: 24,
  },
  songContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 70,
  },
});
