import React, { useEffect, useState }  from 'react'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth';

import useGlobalState from '../globalState'

export default LandingScreen = ({navigation}) => {
    const [{loggedIn},actions] = useGlobalState()
    useEffect(() => {
        var found = false
        const onAuthStateChanged = (user) => {
            if(user && !found){
                found = true
                actions.login({email: user._user.email, nav: ()=>navigation.navigate("App")})
            }
        }
        const timeout = setTimeout(()=>{if(!loggedIn) navigation.navigate("Auth")}, 2000);
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return ()=> {
            subscriber(); // unsubscribe on unmount
            clearTimeout(timeout)
        }
    }, []);

      return(
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <Text>loading app...</Text>
          </View>
      )
    }