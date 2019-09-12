import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Dimensions, Platform } from 'react-native'

import Geolocation from 'react-native-geolocation-service';
import MapComponent from '../components/MapComponent';
import CustomMarker from '../components/CustomMarker';

const {width, height} = Dimensions.get("window")

export default MainScreen = () => {
    const [ pos, setPos ] = useState({lat: 0, lon: 0})
    const [enemies, setEnemies] = useState([]);
    const man = require("../assets/images/man.png");
    useEffect(()=>{
        const watch = Geolocation.watchPosition(
            ({coords})=>{
                console.log("new pos", coords);
                setPos({
                    lat: coords.latitude,
                    lon: coords.longitude
                });
            },
            (err)=>{
                console.log(err.message)
            }, { enableHighAccuracy: true, maximumAge: 500, distanceFilter: 5, interval: 3000, fastestInterval: 3000 }
        )
        return ()=> Geolocation.clearWatch(watch)
    },[])

    const onPress = (e) => {
        setEnemies([
            ...enemies,
            e.nativeEvent.coordinate
        ]);
    }
    return(
        <View style={styles.mainView}>
            {
                <MapComponent pos={pos} press={onPress}>
                    {
                        enemies.map((enemy)=><CustomMarker coord={enemy} key={enemy.latitude * enemy.longitude}/>)
                    }
                    <CustomMarker coord={{latitude: pos.lat, longitude: pos.lon}} source={man} />
                </MapComponent>
            }
            <View style={{position: "absolute", top: Platform.OS === "ios" ? 60 : 10, height: 70, width: "100%", backgroundColor: "grey"}}>

            </View>
            <View style={{position: "absolute", bottom: Platform.OS === "ios" ? "25%" : "22%", height: 100, width: "100%", backgroundColor: "grey"}}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView:{
        ...StyleSheet.absoluteFill, 
        justifyContent: "center", 
        alignItems: "center", 
        height: "125%",
    },
})