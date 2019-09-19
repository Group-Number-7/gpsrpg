import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useStateValue } from '../context/Context'

import auth from '@react-native-firebase/auth';

export default LoginScreen = ({navigation}) => {

  const [initilizing, setInitilizing] = useState(true);
  const [user, setUser] = useState();
 
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user)

    if (initilizing) setInitilizing(false);
  }
 
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
 
  if (initilizing) return null;
 
  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
 
  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}