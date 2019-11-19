import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Images from '../assets/images'
import ProgressBar from '../components/ProgressBar'
import useGlobalState from '../globalState'

export default function AttackScreen({navigation}){

    const [{username, calcStats, currentStats}, actions] = useGlobalState();
    const enemy = useState(navigation.getParam('enemy'))[0];
    const [enemyStats, setEnemyStats] = useState(enemy.stats)

    const attack = ()=>{
        let atk = currentStats.attack - enemyStats.def
        let newLife = enemyStats.hp - (atk > 0 ? atk : 0) 
        if(newLife <= 0){
            setEnemyStats({...enemyStats, hp: 0})
            setTimeout(()=>{
                navigation.navigate("Main")
            },200)
        } else {
            setEnemyStats({
                ...enemyStats, hp: newLife
            })
            enemyAttack();
        }
    }

    const enemyAttack = () => {
        let atk = enemyStats.attack - currentStats.def
        let newLife = currentStats.hp - (atk > 0 ? atk : 0)
        if(newLife <= 0){
            navigation.navigate("Main");
            actions.resetStats();
        } else {
            actions.setHP(newLife)
        }
    }

    const Button = ({cb, name}) => {
        return(
            <TouchableOpacity style={{width: "45%", height: "30%", margin: 5, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "black", borderRadius: 5}} onPress={cb}>
                <Text>{name}</Text>
            </TouchableOpacity>
        )
    }

    const Header = () => {
        return(
            <View style={{flex: .3, width: "100%", flexDirection: "row", justifyContent: "space-around", padding: 10, paddingVertical: 20}}>
                <View style={{flex: 1, height: "100%", justifyContent: "space-evenly", margin: 5}}>
                    <Text>{username}</Text>
                    <ProgressBar containerStyle={{height: 25, width: "100%"}} curr={currentStats.hp} max={calcStats.hp} color="rgba(255,0,0,.8)">
                        <Text style={{color: "black"}}>{currentStats.hp}/{calcStats.hp} HP</Text>
                    </ProgressBar>
                    <ProgressBar containerStyle={{height: 25, width: "100%"}} curr={currentStats.mana} max={calcStats.mana} color="rgba(0,0,255,.8)">
                        <Text style={{color: "black"}}>{currentStats.mana}/{calcStats.mana} Mana</Text>
                    </ProgressBar>
                </View>
                <View style={{flex: 1, justifyContent: "space-evenly", height: "100%", margin: 5}}>
                    <Text>{enemy.name}</Text>
                    <ProgressBar containerStyle={{height: 25, width: "100%"}} curr={enemyStats.hp} max={enemy.stats.hp} color="rgba(255,0,0,.8)">
                        <Text style={{color: "black"}}>{enemyStats.hp}/{enemy.stats.hp} HP</Text>
                    </ProgressBar>
                    <ProgressBar containerStyle={{height: 25, width: "100%"}} curr={1} max={1} color="rgba(0,0,255,.8)">
                    </ProgressBar>
                </View>
            </View>
        )
    }

    return !!enemy ? (
        <View style={styles.container}>
            <View style={{flex: 1.5, width: "100%"}}>
                <Header />
                <View style={[styles.container, {  flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20}]}>
                    <Image source={Images.man} style={{width: 80, height: 80}} resizeMode="contain"/>
                    <Image source={Images.man} style={{width: 80, height: 80}} resizeMode="contain"/>
                </View>
            </View>
            <View style={styles.menu}>
                <View style={{ height: "70%", width: "100%", flexDirection: "row", flexWrap: "wrap-reverse", justifyContent: "space-around", alignItems: "flex-end" }}>
                    <Button cb={()=>{navigation.navigate("Main")}} name="Run"/>
                    <Button cb={()=>{}} name="Items"/>
                    <Button cb={attack} name="Attack"/>
                    <Button cb={()=>{}} name="Skill"/>
                </View>
            </View>
        </View>
    ) : null
}

const styles = StyleSheet.create({
    container: {
        flex: 1, width: "100%"
    },
    menu: {
        flex: .8, width: "100%", justifyContent: "center", borderTopWidth: 2, borderColor: "black", padding: 5
    }
})