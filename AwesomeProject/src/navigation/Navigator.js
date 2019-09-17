import React from 'react'
import {Animated, Easing} from 'react-native'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'

import MainScreen from '../screens/MainScreen';
import LandingScreen from '../screens/Landing';
import InventoryScreen from '../screens/InventoryScreen';

const transitionConfig = () => {
    return {
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {      
        const { position, scene } = sceneProps
        const thisSceneIndex = scene.index
        const fade = position.interpolate({
            inputRange: [thisSceneIndex-1, thisSceneIndex],
            outputRange:[0, 1]
        })
        return { opacity: fade }
      },
    }
  }

const AppStack = createStackNavigator({
    Main: MainScreen,
    Inventory: InventoryScreen
}, {
    initialRouteName: "Main",
    headerMode: "none",
    transitionConfig: transitionConfig,
})

const LandingStack = createStackNavigator({
    Landing: LandingScreen
}, {
    headerMode: "none"
})

export default Navigator = createAppContainer(createSwitchNavigator({
  Landing: LandingStack,
  App: AppStack
}, {
  initialRouteName: "Landing"
}));