import React, { useEffect }  from 'react'
import { PermissionsAndroid, View, Platform, Text } from 'react-native'

import { useStateValue } from '../context/Context'
export default LandingScreen = ({navigation}) => {
    const [state, dispatch] = useStateValue();
    useEffect(()=>{
        requestPerm = async () =>{
            try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                'title': 'GPS-RPG',
                'message': 'Needs to access your location '
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location", granted)
                navigation.navigate("App")
            } else {
                console.log("location permission denied")
            }
            } catch (err) {
                console.warn(err)
            }
        }
        Platform.OS === "android" ? requestPerm() : navigation.navigate("App");
      }, [])

      return(
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <Text>loading app...</Text>
          </View>
      )
    }