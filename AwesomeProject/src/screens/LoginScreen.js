import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useStateValue } from '../context/Context'

import auth from '@react-native-firebase/auth';

export default LoginScreen = ({navigation}) => {

  const [,dispatch] = useStateValue();
 
  useEffect(() => {
      auth().signInAnonymously().then((user)=>{
        console.log("user signed in" , user);
        dispatch({type: "login"})
      }).then(()=>{
        navigation.navigate("App")
      })
  }, []);
 
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>logging in...</Text>
    </View>
  );
}