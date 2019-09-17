import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Axios from 'axios';
import constants from '../config/constants';

export default function InventoryScreen({navigation}){
    const [loaded, setLoaded] = useState(false)
    useEffect(()=>{
        setLoaded(true)
    }, [])
    
    return loaded ? (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>
                Inventory
            </Text>
            <TouchableOpacity style={styles.exit} onPress={()=>navigation.navigate("Main")}>
                <Text>X</Text>
            </TouchableOpacity>
        </View>
    ) : 
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>loading...</Text>
    </View>
}
const styles = StyleSheet.create({
    exit: {
        position: "absolute", bottom: 50, 
        width: 70, height: 70, 
        justifyContent: "center", alignItems: "center", 
        borderRadius: 35, borderWidth: 3, borderColor: "black"
    }
})