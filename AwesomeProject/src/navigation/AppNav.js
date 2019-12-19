
import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {Animated, Easing} from 'react-native'

import CustomTabBar from './CustomTabBar'

import InventoryScreen from '../screens/InventoryScreen'
import MainScreen from '../screens/MainScreen'
import CharacterScreen from '../screens/CharacterScreen'
import MenuScreen from '../screens/MenuScreen'
import AudioMenu from '../screens/AudioMenu'
import Gameplay from '../screens/GameplayScreen'
import Screen from '../components/Screen'

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
    Abilities: CharacterScreen,
}, {
    initialRouteName: "Character",
    lazy: true,
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

    Audio: {
        screen: (props)=>(
            <Screen>
                <AudioMenu {...props}/>
            </Screen>
        )
    },

    Game: {
        screen: (props)=>(
            <Screen>
                <Gameplay {...props}/>
            </Screen>
        )
    },

    Main: {
        screen: (props)=>(
            <Screen>
                <MainScreen {...props}/>
            </Screen>
        )
    },
    Inventory: {
        screen: (props) => {
            <Screen>
                <InventoryScreen {...props}/>
            </Screen>
        }
    },
    Profile: profileStack,
    Menu: {
        screen: (props) => (
            <Screen>
                <MenuScreen {...props}/>
            </Screen>
        )
    }

}, {
    initialRouteName: "Main",
    headerMode: "none",
    transitionConfig: transitionConfig
}))
