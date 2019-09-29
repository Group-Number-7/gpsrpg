
import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator, TabView } from 'react-navigation-tabs';
import {Animated, Easing} from 'react-native'

import CustomTabBar from './CustomTabBar'

import InventoryScreen from '../screens/InventoryScreen'
import MainScreen from '../screens/MainScreen'
import CharacterScreen from '../screens/CharacterScreen'

const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 300,
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

const profileStack = createMaterialTopTabNavigator({
    Character: CharacterScreen,
    Stats: InventoryScreen,
    Abilities: CharacterScreen
}, {
    initialRouteName: "Character",
    lazy: false,
    tabBarOptions: {
        activeTintColor: "red",
        inactiveTintColor: "rgba(255,255,200,1)",
        labelStyle: {
          fontSize: 12,
        },
        tabStyle: {
          flex: 1,
        },
        style: {
          backgroundColor: 'blue',
        },
        indicatorStyle: {
            backgroundColor: "transparent"
        }
    },
    tabBarComponent: props => <CustomTabBar {...props} />
})

export default AppNav = createAppContainer(createStackNavigator({
    Main: MainScreen,
    Inventory: InventoryScreen,
    Profile: profileStack
}, {
    initialRouteName: "Main",
    headerMode: "none",
    transitionConfig: transitionConfig
}))