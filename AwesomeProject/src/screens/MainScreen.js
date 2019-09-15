import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native'
import Axios from 'axios';

import Geolocation from 'react-native-geolocation-service';
import MapComponent from '../components/MapComponent';
import CustomMarker from '../components/CustomMarker';

import TouchableImage from '../components/TouchableImage';
import constants from '../config/constants';
import ProgressBar from '../components/ProgressBar';

import {useStateValue} from '../context/Context';
const {width, height} = Dimensions.get("window")

export default MainScreen = React.memo(({navigation}) => {
    const [ pos, setPos ] = useState({lat: 0, lon: 0})
    const [enemies, setEnemies] = useState([]);
    const [ready, setReady] = useState(false);
    const man = require("../assets/images/man.png");
    const inv = require("../assets/images/inventory.png");
    const [{stats, currentStats, level, exp, expToNextLevel}, dispatch] = useStateValue();

    useEffect(()=>{
        const watch = Geolocation.watchPosition(
            ({coords})=>{
                setPos({
                    lat: coords.latitude,
                    lon: coords.longitude
                });
            },
            (err)=>{
                console.log(err.message)
            }, { enableHighAccuracy: true, maximumAge:-1, distanceFilter: 5, interval: 500, fastestInterval: 500 }
        )
        return ()=> Geolocation.clearWatch(watch)
    },[])

    useEffect(()=>{
        if(ready)
            Axios.get(`${constants.server_add}/location/enemies/${pos.lat}/${pos.lon}/${10}`)
                .then(({data})=>{
                    setEnemies([
                        ...data
                    ])
                }).catch((err)=>{
                    console.log(err);
                })
    },[pos])

    return(
        <View style={styles.mainView}>
            {
                <MapComponent pos={pos} onReady={()=>{setReady(true); console.log("raedy")}}>
                    {
                        enemies.map((enemy)=>{
                            console.log("en test", enemy)
                            return enemy.location && <CustomMarker coord={enemy.location} key={enemy.location.latitude * enemy.location.longitude}/>
                        })
                    }
                    <CustomMarker coord={{latitude: pos.lat, longitude: pos.lon}} source={man} />
                </MapComponent>
            }
            <View style={{...StyleSheet.absoluteFill, height: "80%", alignItems: "center"}}>
                <View style={{flex: .7, width: "100%", paddingHorizontal:10}}>
                    <View style={{flex: .9, height: 80, width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                        <View style={{flex: 1, height: "100%", justifyContent: "center", alignItems: "center", flexDirection:"column"}}>
                            <Text>{currentStats.hp}/{stats.hp} hp</Text>
                            <ProgressBar containerStyle={{height: 20, width: "100%"}} curr={currentStats.hp} max={stats.hp} color="red"/>
                        </View>
                        <View style={{flex: 1, height: "100%", justifyContent: "center", alignItems: "center"}}>
                            <Image source={man} style={{height:80, width: 50, margin: 10}} resizeMode={"contain"} />
                        </View>
                        <View style={{flex: 1, height: "100%", justifyContent: "center", alignItems: "center"}}>
                            <Text>{currentStats.mana}/{stats.mana} mana</Text>
                            <ProgressBar containerStyle={{height: 20, width: "100%"}} curr={currentStats.mana} max={stats.mana} color="blue"/>
                        </View>
                    </View>
                    <View style={{flex: .1, width: "100%", justifyContent: "flex-end", alignItems: "center"}}>
                        <Text style={{width: "100%", textAlign: "left", paddingLeft: 5}}>{String(exp)}/{expToNextLevel} xp to level {level+1}</Text>
                        <ProgressBar containerStyle={{height: 20, width: "100%"}} curr={exp} max={expToNextLevel} color="green"/>
                    </View>
                </View>
                <View style={{flex:2}}/>
                <View style={{flex: .7, width: "100%", justifyContent: "flex-start", alignItems: "center"}}>
                    <TouchableImage src={inv} style={{height: 100, width: "30%"}} onPress={()=>navigation.navigate("Inventory")}/>
                </View>
            </View>
            
        </View>
    )
})

const styles = StyleSheet.create({
    mainView:{
        ...StyleSheet.absoluteFill, 
        justifyContent: "center", 
        alignItems: "center", 
        height: "125%",
    },
})