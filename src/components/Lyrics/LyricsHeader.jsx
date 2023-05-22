import { View, TouchableOpacity } from "react-native";
import React from "react";
import BackIcon from "../icons/BackIcon";
import useScreenDimensions from "../../hooks/useDimension";
import { useNavigation } from "@react-navigation/native";
import Typography from "../Typography";
import MoreIcon from "../icons/MoreIcon";

const LyricsHeader = ({ title, status }) => {
  const { width } = useScreenDimensions();
  const navigation = useNavigation();

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <View
      className={`flex-row self-center items-center justify-between mb-10 ${
        status === "failed" && "mt-10"
      } `}
      style={{ width: width * 0.9 }}
    >
      <TouchableOpacity
        onPress={handleBackButton}
        className="w-6 h-6 rounded-full bg-accent items-center justify-center"
      >
        <BackIcon />
      </TouchableOpacity>
      <Typography size={20} bold styles="text-white text-xl">
        {title.replace(/\([^()]*\)/g, "")}
      </Typography>
      <TouchableOpacity>
        <MoreIcon />
        <MoreIcon />
        <MoreIcon />
      </TouchableOpacity>
    </View>
  );
};

export default LyricsHeader;
