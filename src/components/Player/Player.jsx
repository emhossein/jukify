import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { toggle } from "../../store/showSlice";
import SongScreen from "./../../screens/SongScreen";

const Test = () => {
  const dispatch = useDispatch();
  const { shown } = useSelector((state) => state.show);

  return (
    <>
      <View
        onPress={() => dispatch(toggle())}
        className={`absolute flex-1 w-full h-full ${
          shown ? "top-0" : "top-full"
        } transition-all duration-4000`}
      >
        <SongScreen />
      </View>
    </>
  );
};

export default Test;
