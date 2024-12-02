import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from 'screens/home/HomeScreen'

import LearnScreen from 'screens/learn/LearnScreen'
import TableScreen from 'screens/learn/TableScreen'

import LevelScreen from 'screens/play/LevelScreen'
import PlayScreen from 'screens/play/PlayScreen'
import ScoreScreen from 'screens/play/ScoreScreen'
import SplashScreen from 'screens/splashscreen'

const Stack = createStackNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Learn" component={LearnScreen} />
      <Stack.Screen name="Table" component={TableScreen} />
      <Stack.Screen name="Level" component={LevelScreen} />
      <Stack.Screen name="Play" component={PlayScreen} />
      <Stack.Screen name="Score" component={ScoreScreen} />
    </Stack.Navigator>
  )
}
export default AppStack
