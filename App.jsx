import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import store from "./src/store/index";
import { Tabs } from "./src/screens/Index";
import AuthScreen from "./src/screens/AuthScreen";
import Player from "./src/components/Player/Player";
import StickyPlayer from "./src/components/Player/StickyPlayer";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator initialRouteName="Tabs">
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>

          <StickyPlayer />
          <Player />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
