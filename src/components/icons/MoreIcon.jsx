import React from "react";
import { View } from "react-native";
import { Svg, Circle } from "react-native-svg";

const MoreIcon = () => {
  return (
    <View className="mb-[3px]">
      <Svg
        width="4"
        height="4"
        viewBox="0 0 4 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Circle cx="1.96494" cy="1.96493" r="1.96393" fill="#DDDDDD" />
      </Svg>
    </View>
  );
};

export default MoreIcon;
