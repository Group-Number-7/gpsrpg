import React, {useEffect, useState} from 'react'
import Geolocation from 'react-native-geolocation-service';

import Navigator from '../navigation/Navigator'
import {useStateValue} from '../context/Context'

export default () => {
    const [{pos},dispatch] = useStateValue()
    const [ready, setReady] = useState(false);
    useEffect(()=>{
        const watch = Geolocation.watchPosition(
            ({coords})=>{
                console.log("new coords", coords);
                dispatch({
                    type:"pos",
                    value:coords
                })
                setReady(true);
            },
            (err)=>{
                console.log(err.message)
            }, { enableHighAccuracy: true, maximumAge:1000, distanceFilter: 5, timeout:500, interval:300, fastestInterval:300 }
        )
        return ()=> Geolocation.clearWatch(watch)
    },[])

    return ready && (
        <Navigator />
    )
}