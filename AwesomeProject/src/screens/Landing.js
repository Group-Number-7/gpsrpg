import React, { useEffect }  from 'react'
import { PermissionsAndroid, View, Platform, Text } from 'react-native'

export default LandingScreen = ({navigation}) => {
    useEffect(()=>{
        navigation.navigate("App");
      }, [])

      return(
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <Text>loading app...</Text>
          </View>
      )
    }