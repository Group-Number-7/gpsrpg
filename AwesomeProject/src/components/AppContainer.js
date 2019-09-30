import React, { useEffect, useState, useMemo } from 'react'
import Geolocation from 'react-native-geolocation-service';
import { View, Text } from 'react-native'

import useGlobalState from '../globalState'
import AppNav from '../navigation/AppNav'
import auth from '@react-native-firebase/auth'

export default AppContainer = React.memo(({navigation}) => {
    const [{loggedIn}, actions] = useGlobalState()
    const [ready, setReady] = useState(false);

    useEffect(() => {
        var watch = Geolocation.watchPosition(
            ({coords})=>{
                actions.setPos(coords)
                if(!ready)
                    setReady(true);
            },
            (err)=>{
                console.log(err.message)
            }, { enableHighAccuracy: true, maximumAge:1000, distanceFilter: 5, timeout:500, interval:500, fastestInterval:500 }
        )
        return () => Geolocation.clearWatch(watch)
    }, [])

    useEffect(()=>{
        if(!loggedIn){
            auth().signOut().then(()=>{
                navigation.navigate("Auth")
            })
        }
    },[loggedIn])

    return ready ?
        (<AppNav />)
        : 
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>getting location data</Text>
        </View>
}, [])