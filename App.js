import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SongScreen from './src/screens/SongScreen'
import IndexScreen from './src/screens/IndexScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
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
          initialParams={{ track: 'sky playboi carti' }}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
