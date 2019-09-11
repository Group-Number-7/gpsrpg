import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Dimensions, Platform } from 'react-native'

import Geolocation from 'react-native-geolocation-service';
import MapComponent from '../components/MapComponent';
import CustomMarker from '../components/CustomMarker';

const {width, height} = Dimensions.get("window")

import {distance_in_m} from '../helpers/helpers'

export default MainScreen = () => {
    const [ pos, setPos ] = useState({lat: 0, lon: 0})
    const [enemies, setEnemies] = useState([]);
    const man = require("../assets/images/man.png");
    useEffect(()=>{
        Geolocation.watchPosition(
            ({coords})=>{
                if(distance_in_m(coords.latitude, coords.longitude, pos.lat, pos.lon) > 1){
                    console.log("new pos", coords);
                    setPos({
                        lat: coords.latitude,
                        lon: coords.longitude
                    });
                }
            },
            (err)=>{
                console.log(err.message)
            }, { enableHighAccuracy: true, maximumAge: 0, distanceFilter: 5, interval: 500, fastestInterval: 500 })
    })

    const onPress = (e) => {
        setEnemies([
            ...enemies,
            e.nativeEvent.coordinate
        ]);
    }
    return(
        <View style={styles.mainView}>
            <MapComponent pos={pos} press={onPress}>
                {
                    enemies.map((enemy)=><CustomMarker coord={enemy} key={enemy.latitude * enemy.longitude}/>)
                }
                <CustomMarker coord={{latitude: pos.lat, longitude: pos.lon}} source={man} />
            </MapComponent>
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