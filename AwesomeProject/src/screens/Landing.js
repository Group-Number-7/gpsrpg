import React, { useEffect }  from 'react'
import { PermissionsAndroid, View, Platform } from 'react-native'

export default LandingScreen = ({navigation}) => {
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
          <View></View>
      )
    }