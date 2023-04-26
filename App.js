import { Provider } from "react-redux";
import { TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import store from "./src/store/index";
import SongScreen from "./src/screens/SongScreen";
import IndexScreen from "./src/screens/IndexScreen";

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
            name="Song"
            component={SongScreen}
            options={{
              headerShown: false,
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
