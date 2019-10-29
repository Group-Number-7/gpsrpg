import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Axios from 'axios';
import FastImage from 'react-native-fast-image'

import MapComponent from '../components/MapComponent';
import EnemyMarker from '../components/EnemyMarker';
import UserMarker from '../components/UserMarker';

import TouchableImage from '../components/TouchableImage';
import constants from '../config/constants';
import ProgressBar from '../components/ProgressBar';

import useGlobalState from '../globalState';
import useInterval from '../hooks/useInterval';

import Images from '../assets/images'
import ConfirmAttackModal from '../components/ConfirmAttackModal';

export default MainScreen = ({navigation}) => {
    const [enemies, setEnemies] = useState([]);
    const savedEnemies = useRef([])
    const [ready, setReady] = useState(false);
    const [freshEnemies, refreshEnemies] = useState(false);
    const [confirmAttack, setConfirmAttack] = useState(false);

    useInterval(()=>refreshEnemies(!freshEnemies), 10000)
    const [{pos, username, calcStats, currentStats, exp, expToNextLevel, level}, actions] = useGlobalState();

    const getEnemies = () => {
        if(ready){
            Axios.get(`${constants.server_add}/location/enemies/${pos.latitude}/${pos.longitude}/${10}`)
            .then(({data})=>{
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
    },[pos, ready, freshEnemies])

    const HeaderInfo = () => {
        return(
            <View style={styles.headerContainer}>
                <View style={styles.topContainer}>
                    <TouchableOpacity style={styles.charContainer} onPress={()=>navigation.navigate("Profile")}>
                        <Text style={{flex: .25, width: "100%", textAlign: "center"}} numberOfLines={1}>{username.toUpperCase()}</Text>
                        <FastImage source={Images.man} style={{height: "100%", width: 50, margin: 10}} resizeMode="contain"/>
                    </TouchableOpacity>
                    <View style={{flex: 4, padding: 5, height: "100%", justifyContent: "flex-end"}}>
                        <Text style={{width: "100%", textAlign: "center", flex: 1, fontSize: 18}}>Level {level}</Text>
                        <View style={styles.barContainer}>
                            <ProgressBar containerStyle={{height: 25, width: "100%"}} curr={currentStats.hp} max={calcStats.hp} color="rgba(255,0,0,.8)">
                                <Text style={{color: "black"}}>{currentStats.hp}/{calcStats.hp} hp</Text>
                            </ProgressBar>
                        </View>
                        <View style={styles.barContainer}>
                            <ProgressBar containerStyle={{height: 25, width: "100%"}} curr={currentStats.mana} max={calcStats.mana} color="rgba(50,50,255,.8)">
                                <Text style={{color: "black"}}>{currentStats.mana}/{calcStats.mana} mana</Text>
                            </ProgressBar>
                        </View>
                    </View>
                </View>
                <View style={styles.xpContainer}>
                    <ProgressBar containerStyle={{height: 25, width: "100%"}} curr={exp} max={expToNextLevel} color="rgba(50,255,50,.8)">
                        <Text style={{color: "black"}}>{String(exp)}/{expToNextLevel} xp</Text>
                    </ProgressBar>
                </View>
            </View>
        )
    }

    return(
        <View style={styles.mainView}>
            <ConfirmAttackModal show={confirmAttack} close={()=>setConfirmAttack(false)}/>
            {
                <MapComponent onReady={()=>{setReady(true); console.log("raedy")}}>
                    {
                        enemies.map((enemy)=>{
                            return <EnemyMarker coord={enemy.location} key={enemy.location.latitude * enemy.location.longitude} press={()=>setConfirmAttack(true)}/>
                        })
                    }
                    {pos && <UserMarker coord={{latitude: pos.latitude, longitude: pos.longitude}} source={Images.man} /> }
                </MapComponent>
            }   
            <HeaderInfo />
            <View style={styles.bottomMenu}>
                    <TouchableImage src={Images.inventory} style={{height: 80, width: "30%"}} resizeMode={"contain"} onPress={()=>navigation.navigate("Inventory")}/>
                    <TouchableImage src={Images.hamburger} style={{height: 50, width: "30%"}} resizeMode={"contain"} imgStyle={{tintColor: "rgba(1,1,1,.7)"}} onPress={()=>navigation.navigate("Menu")}/>
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
    headerContainer:{
        position:"absolute",
        top: 0,
        left: 0,
        height: 140, 
        width: "100%",
        borderBottomWidth: 2,
        borderBottomColor: "black",
    },
    topContainer: {
        flex: .8, 
        width: "100%", 
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    charContainer:{
        flex: 1.5, 
        height: "100%", 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection:"column",
        borderBottomColor: "black",
        borderRightColor: "black",
        borderRightWidth: 2,
        borderBottomWidth: 2
    },
    barContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-end"
    },  
    xpContainer:{
        flex: .2, 
        width: "100%", 
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    bottomMenu:{
        position:"absolute",
        bottom: "22%",
        width: "100%", 
        justifyContent: "space-between", 
        alignItems: "center",
        flexDirection: "row"
    },
})