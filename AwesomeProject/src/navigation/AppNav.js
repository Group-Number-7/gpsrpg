
import { createStackNavigator, createAppContainer } from 'react-navigation'
import {Animated, Easing} from 'react-native'

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

export default AppNav = createAppContainer(createStackNavigator({
    Main: MainScreen,
    Inventory: InventoryScreen,
    Character: CharacterScreen
}, {
    initialRouteName: "Main",
    headerMode: "none",
    transitionConfig: transitionConfig,
}))