import { Text, View } from "react-native";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import { PixelRatio } from "react-native";

const Typography = ({ children, numberOfLines, styles, bold, style, size }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const getResponsiveFontSize = (fontSize) => {
    const pixelRatio = PixelRatio.getFontScale();
    const responsiveFontSize = fontSize * pixelRatio;
    return responsiveFontSize;
  };

  const defaultFontSize = !size ? 16 : size;
  const responsiveFontSize = getResponsiveFontSize(defaultFontSize);

  const loadFonts = async () => {
    await Font.loadAsync({
      Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
      MontserratBold: require("../../assets/fonts/Montserrat-Bold.ttf"),
      Satoshi: require("../../assets/fonts/Satoshi-Regular.ttf"),
      SatoshiBold: require("../../assets/fonts/Satoshi-Bold.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <View>
      {fontsLoaded && (
        <Text
          numberOfLines={numberOfLines}
          style={[
            { fontFamily: bold ? "SatoshiBold" : "Satoshi" },
            style,
            { fontSize: responsiveFontSize },
          ]}
          className={styles}
        >
          {children}
        </Text>
      )}
    </View>
  );
};

export default Typography;
