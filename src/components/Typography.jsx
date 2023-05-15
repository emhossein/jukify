import { Text, View } from "react-native";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";

const Typography = ({ children, numberOfLines, styles, bold, style }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
          style={[{ fontFamily: bold ? "SatoshiBold" : "Satoshi" }, style]}
          className={styles}
        >
          {children}
        </Text>
      )}
    </View>
  );
};

export default Typography;
