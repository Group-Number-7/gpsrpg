import React, { useEffect, useState, useRef } from 'react'
import { View, TouchableWithoutFeedback, Image, StyleSheet, Dimensions, Platform } from 'react-native'

import Geolocation from 'react-native-geolocation-service';
import MapComponent from '../components/MapComponent';
import CustomMarker from '../components/CustomMarker';

import TouchableImage from '../components/TouchableImage';

const {width, height} = Dimensions.get("window")

export default MainScreen = ({navigation}) => {
    const [ pos, setPos ] = useState({lat: 0, lon: 0})
    const [enemies, setEnemies] = useState([]);
    const man = require("../assets/images/man.png");
    const inv = require("../assets/images/inventory.png");

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
            <View style={{position: "absolute", top: Platform.OS === "ios" ? 40 : 20, height: 80, width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                <View style={{width: width / 3, height: 20, backgroundColor: "blue"}}></View>
                    <Image source={man} style={{height:80, width: 50, margin: 10}} resizeMode={"contain"} />
                <View style={{width: width / 3, height: 20, backgroundColor: "red"}}></View>
            </View>
            <View style={{position: "absolute", bottom: Platform.OS === "ios" ? "25%" : "22%", height: 100, width: "100%", justifyContent: "center", alignItems: "center"}}>
                <TouchableImage src={inv} style={{height: "100%", width: "30%"}} onPress={()=>navigation.navigate("Inventory")}/>
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