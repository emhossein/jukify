import React from "react";
import { View } from "react-native";
import { Svg, Path } from "react-native-svg";

const PauseIcon = ({ width, height }) => {
  return (
    <View>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 10 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M2.375 1.5C2.375 1.01675 1.98325 0.625 1.5 0.625C1.01675 0.625 0.625 1.01675 0.625 1.5V22.5C0.625 22.9832 1.01675 23.375 1.5 23.375C1.98325 23.375 2.375 22.9832 2.375 22.5L2.375 1.5Z"
          fill="white"
        />
        <Path
          d="M9.375 1.5C9.375 1.01675 8.98325 0.625 8.5 0.625C8.01675 0.625 7.625 1.01675 7.625 1.5L7.625 22.5C7.625 22.9832 8.01675 23.375 8.5 23.375C8.98325 23.375 9.375 22.9832 9.375 22.5V1.5Z"
          fill="white"
        />
      </Svg>
    </View>
  );
};

export default PauseIcon;
