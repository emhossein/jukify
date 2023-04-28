import { Provider, useSelector } from "react-redux";
import { TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import store from "./src/store/index";
import SongScreen from "./src/screens/SongScreen";
import IndexScreen from "./src/screens/IndexScreen";
import { Text } from "react-native";
import Player from "./src/components/Player/Player";
import LyricsScreen from "./src/screens/LyricsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={IndexScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Lyrics"
            component={LyricsScreen}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
        <Player />
      </NavigationContainer>
    </Provider>
  );
}
