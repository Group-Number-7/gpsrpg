import React, { useEffect, useState, useRef } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import Axios from 'axios';

import MapComponent from '../components/MapComponent';
import CustomMarker from '../components/CustomMarker';

import TouchableImage from '../components/TouchableImage';
import constants from '../config/constants';
import ProgressBar from '../components/ProgressBar';

import {useStateValue} from '../context/Context';

export default MainScreen = React.memo(({navigation}) => {
    const [{pos},] = useStateValue();
    const [enemies, setEnemies] = useState([]);
    const savedEnemies = useRef([])
    const [ready, setReady] = useState(false);
    const man = require("../assets/images/man.png");
    const inv = require("../assets/images/inventory.png");
    const [{stats, currentStats, level, exp, expToNextLevel}, dispatch] = useStateValue();

    const getEnemies = () => {
        if(ready){
            console.log("getting enemies")
            Axios.get(`${constants.server_add}/location/enemies/${pos.latitude}/${pos.longitude}/${10}`)
            .then(({data})=>{
                console.log("new enemies: ", enemies)
                setEnemies([
                    ...data
                ])
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
    useEffect(()=>{
        if(savedEnemies.current.length > 1) setEnemies(savedEnemies.current)
        else getEnemies()
        return () => savedEnemies.current = enemies
    }, [])
    useEffect(()=>{
        getEnemies()
    },[pos, ready])

    useEffect(()=>{
        console.log("render mainscreen")
    })

    const HeaderInfo = () => {
        return(
            <View style={styles.headerContainer}>
                <View style={styles.topContainer}>
                    <View style={styles.barContainer}>
                        <Text>{currentStats.hp}/{stats.hp} hp</Text>
                        <ProgressBar containerStyle={{height: 20, width: "100%"}} curr={currentStats.hp} max={stats.hp} color="red"/>
                    </View>
                    <View style={styles.barContainer}>
                        <Image source={man} style={{height:80, width: 50, margin: 10}} />
                    </View>
                    <View style={styles.barContainer}>
                        <Text>{currentStats.mana}/{stats.mana} mana</Text>
                        <ProgressBar containerStyle={{height: 20, width: "100%"}} curr={currentStats.mana} max={stats.mana} color="blue"/>
                    </View>
                </View>
                <View style={styles.xpContainer}>
                    <Text style={{width: "100%", textAlign: "left", paddingLeft: 5}}>{String(exp)}/{expToNextLevel} xp to level {level+1}</Text>
                    <ProgressBar containerStyle={{height: 20, width: "100%"}} curr={exp} max={expToNextLevel} color="green"/>
                </View>
            </View>
        )
    }
    return(
        <View style={styles.mainView}>
            {
                <MapComponent onReady={()=>{setReady(true); console.log("raedy")}}>
                    {
                        enemies.map((enemy)=>{
                            return <CustomMarker coord={enemy.location} key={enemy.location.latitude * enemy.location.longitude}/>
                        })
                    }
                    {pos && <CustomMarker coord={{latitude: pos.latitude, longitude: pos.longitude}} source={man} /> }
                </MapComponent>
            }   
            <HeaderInfo />
            <View style={styles.inventoryContainer}>
                <TouchableImage src={inv} style={{height: 100, width: "30%"}} onPress={()=>navigation.navigate("Inventory")}/>
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
    headerContainer:{
        position:"absolute",
        top: 20,
        height: 110, 
        width: "100%", 
        justifyContent: "center", 
        alignItems: "center", 
        paddingHorizontal: 10
    },
    topContainer: {
        flex: .8, 
        width: "100%", 
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    barContainer:{
        flex: 1, 
        height: "100%", 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection:"column"
    },
    xpContainer:{
        flex: .2, 
        width: "100%", 
        justifyContent: "flex-end",
        alignItems: "center"
    },
    inventoryContainer:{
        position:"absolute",
        bottom: "25%",
        width: "100%", 
        justifyContent: "flex-start", 
        alignItems: "center",
    }
})