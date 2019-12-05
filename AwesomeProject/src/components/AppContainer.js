import React, { useEffect, useState, useRef } from 'react'
import Geolocation from 'react-native-geolocation-service';
import { View, Text, PermissionsAndroid } from 'react-native'

import useGlobalState from '../globalState'
import AppNav from '../navigation/AppNav'
import useInterval from '../hooks/useInterval';

export default AppContainer = React.memo(({navigation}) => {
    const [{loggedIn, currentStats, calcStats, inBattle}, actions] = useGlobalState()
    const [granted, setGranted] = useState(false)
    const [ready, setReady] = useState(false);
    const watchRef = useRef();

    useInterval(()=>{
        if(!inBattle) {
            let newLife = currentStats.hp + Math.ceil(currentStats.hp * .01)
            if(newLife <= calcStats.hp){
                actions.setHP(newLife)
            } else {
                actions.setHP(calcStats.hp)
            }
        }
    }, 10000)

    const reqPerm = async () => {
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
                setGranted(true)
            } else {
                console.log("location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    useEffect(() => {
        Platform.OS === "android" ? reqPerm() : setGranted(true)
        return () => Geolocation.clearWatch(watchRef.current)
    }, [])

    useEffect(()=>{
        if(granted){
            watchRef.current = Geolocation.watchPosition(
                ({coords})=>{
                    actions.setPos(coords)
                    if(!ready)
                        setReady(true);
                },
                (err)=>{
                    console.log("loc err", err.code , err.message)
                }, { enableHighAccuracy: true, maximumAge:1000, distanceFilter: 5, timeout:500, interval:500, fastestInterval:500, skipPermissionRequests: true }
            )
        }
    },[granted])

    useEffect(()=>{
        if(!loggedIn)
            navigation.navigate("Auth");
    }, [loggedIn])

    return ready ?
        <AppNav />
            : 
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>getting location data</Text>
        </View>
}, [])