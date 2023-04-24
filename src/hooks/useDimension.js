import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

const useScreenDimensions = () => {
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window") || {}
  );

  return screenDimensions;
};

export default useScreenDimensions;
