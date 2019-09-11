import React from 'react'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'

import MainScreen from '../screens/MainScreen';
import LandingScreen from '../screens/Landing';

const AppStack = createStackNavigator({
    Main: MainScreen
}, {
    initialRouteName: "Main",
    headerMode: "none"
})

const LandingStack = createStackNavigator({
    Landing: LandingScreen
})

export default Navigator = createAppContainer(createSwitchNavigator({
    Landing: LandingStack,
    App: AppStack
    }, {
        initialRouteName: "Landing"
    }));