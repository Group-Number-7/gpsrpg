import React, {useEffect, useState} from 'react'
import {View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, FlatList, Image} from 'react-native'
import Axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import constants from '../config/constants';


export default  InventoryScreen = ({navigation}) => {
    const [filter, setFilter] = useState("")
    const [showFilterMenu, setFilterMenu] = useState(false);
    const [selected, setSelected] = useState({
        w: true, o: true, j: true, h: true, c: true, l: true, f: true
    })
    const filterKeys = ['w', 'o', 'j','h', 'c', 'l', 'f'];
    const categories = {
        'w': "Weapons",
        'o': "Offhand",
        'j': "Jewelry",
        'h': 'Head',
        'c': "Chest",
        'l': "Legs",
        'f': "Feet"
    }

    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([1,2,3,5,6,7,8,9])
    const enemy = require("../assets/images/enemy.png");

    useEffect(()=>{
        var d = data
        if(d.length % 3 >= 1) d.push(0)
        if(d.length % 3 >= 1) d.push(0)
        setData(d);
        setLoaded(true)
    }, [])

    const renderItem = ({ item }) => {
        if(item === 0){
            return <View style={{flex: 1, margin: 3}}/>
        }
        return(
            <TouchableOpacity style={{flex: 1, height: 100, margin: 3, borderColor: "black", borderWidth: 1, borderRadius: 5, justifyContent: "center", alignItems: "center"}}>
                <Image source={enemy} style={{flex: 1, width: "50%"}} resizeMode="center" onError={(e)=>console.log("err", e)}/>
                <Text style={{width: "100%", textAlign: "center"}}>Item name {item}</Text>
            </TouchableOpacity>
        )       
    }

    const selectFilter = (key) => {
        setSelected((prev=> {
            return {
                ...prev, [key]: !selected[key]
            }
        })) 
    }
    const filterMenu = () => {
        return showFilterMenu && (
            <View style={{position: "absolute", height: 210, width: 115, top: 63, right: 10, borderColor: "black", borderWidth: 1, borderRadius: 3, backgroundColor: "white"}}>
                {
                    filterKeys.map((key, index)=>{
                        return(
                            <TouchableOpacity onPress={()=>selectFilter(key)} style={{flexDirection: "row", height: 30, width: "100%", alignItems: "center", paddingHorizontal: 3}} key={index}>
                                <Text style={{width: "80%", height: 30, textAlign: "left", textAlignVertical: "center"}}>{categories[key]}</Text>
                                <Icon name={selected[key] ? "check-square-o" : "close"} size={15} style={{marginTop: 3}}/>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    return loaded ? (
        <KeyboardAvoidingView style={styles.container} behavior="height" keyboardVerticalOffset={20}>
            <View style={styles.searchBar}> 
                <TouchableOpacity style={styles.icon}>  
                    <Icon name="search" size={30}/>
                </TouchableOpacity>
                <TextInput style={styles.search} value={filter} placeholder="search" onChangeText={(e)=>setFilter(e)}/>
                <TouchableOpacity style={styles.icon} onPress={()=>setFilterMenu(!showFilterMenu)}>  
                    <Icon name="filter" size={30}/>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
                style={{flex: 1, width: "100%"}}
                numColumns={3}
            />
            <View style={{height: 50, width: "100%", flexDirection: "row", borderWidth: 1, borderColor: "black"}}>
                <TouchableOpacity onPress={()=>navigation.navigate("Main")} style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Icon name="chevron-left" size={30}/>
                </TouchableOpacity>
                <View style={{flex: 3, flexDirection: "row", borderRightColor: "black", borderRightWidth: 1, borderLeftColor: "black", borderLeftWidth: 1, justifyContent: "flex-start", alignItems: "center", padding: 10}}>
                    <Icon name="money" size={30} style={{width: "25%"}}/>
                    <Text>$5,100</Text>
                </View>
                <View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
                    <Text>{data.length}/500</Text>
                </View>
            </View>
            {filterMenu()}
        </KeyboardAvoidingView>
    ) : 
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>loading...</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "rgba(255,255,200,1)"
    },
    searchBar: {
        height: 50, width: "100%", 
        borderColor: "black", borderWidth: 1, 
        flexDirection: "row", 
        justifyContent: "center", alignItems: "center"
    },
    icon: {
        width: "10%", height: "100%", 
        justifyContent: "center", alignItems: "center"
    },
    search: {
        width: "80%", 
        borderLeftColor: "rgba(1,1,1,.8)", 
        borderLeftWidth: 1,
        borderRightColor: "rgba(1,1,1,.8)", 
        borderRightWidth: 1
    }
})