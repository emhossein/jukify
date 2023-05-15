import { useState } from "react";
import { Dimensions } from "react-native";

const useScreenDimensions = () => {
  const [screenDimensions] = useState(Dimensions.get("window") || {});

  return screenDimensions;
};

export default useScreenDimensions;
