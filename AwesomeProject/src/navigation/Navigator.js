import React from 'react'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'

import LandingScreen from '../screens/Landing';
import LoginScreen from '../screens/LoginScreen';
import AppContainer from '../components/AppContainer';
import SignupScreen from '../screens/SignupScreen';

const AppStack = createStackNavigator({
  Container: AppContainer
}, {
  initialRouteName: "Container",
  headerMode: "none"
})

const LandingStack = createStackNavigator({
    Landing: LandingScreen
}, {
    headerMode: "none"
})

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen
}, {
  initialRouteName: "Login",
  headerMode: "none"
})

export default Navigator = createAppContainer(createSwitchNavigator({
  Landing: LandingStack,
  App: AppStack,
  Auth: AuthStack
}, {
  initialRouteName: "Landing"
}));