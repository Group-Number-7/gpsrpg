import React, {useEffect, useState} from 'react'
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, View, Text } from 'react-native'

import Navigator from '../navigation/Navigator'
import {useStateValue} from '../context/Context'

export default () => {
    const [{pos},dispatch] = useStateValue()
    const [perm, setPerm] = useState(false)
    const [ready, setReady] = useState(false);

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
                setPerm(true)
            } else {
                console.log("location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    useEffect(() => {
        reqPerm()
        watch = Geolocation.watchPosition(
            ({coords})=>{
                dispatch({
                    type:"pos",
                    value:coords
                })
                setReady(true);
                console.log("location found");
            },
            (err)=>{
                console.log(err.message)
            }, { enableHighAccuracy: true, maximumAge:1000, distanceFilter: 5, timeout:500, interval:500, fastestInterval:500 }
        )
        return () => Geolocation.clearWatch(watch)
    }, [perm])

    return (ready && perm) ? (
        <Navigator />
    ) : <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}><Text>getting location data</Text></View>
}