import { StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";
import { Colors, Utils } from "../styles";
import Typography from "../components/Typography";
import { useSelector } from "react-redux";

const UserScreen = () => {
  const { name } = useSelector((state) => state.user);

  return (
    <SafeAreaView style={style.container}>
      <Typography bold style={style.username}>
        {name}
      </Typography>
    </SafeAreaView>
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
  },
});
