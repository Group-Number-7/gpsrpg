import React, { useEffect }  from 'react'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth';

import useGlobalState from '../globalState'
import useInterval from '../hooks/useInterval'

export default LandingScreen = ({navigation}) => {
    const [{loggedIn},actions] = useGlobalState()
    useEffect(() => {
        const onAuthStateChanged = (user) => {
            if(user){
                console.log("user found")
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