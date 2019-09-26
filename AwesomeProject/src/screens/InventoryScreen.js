import React, {useEffect, useState} from 'react'
import {View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, FlatList} from 'react-native'
import Axios from 'axios';
import constants from '../config/constants';
import {useStateValue } from '../context/Context';

const {height} = Dimensions.get("screen").height;

export default  InventoryScreen = ({navigation}) => {
    const [,dispatch] = useStateValue();
    const [filter, setFilter] = useState("")

    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([1,2,3,4])

    useEffect(()=>{
        setLoaded(true)
        var d = data
        if(d.length % 3 >= 1) d.push(0)
        if(d.length % 3 >= 1) d.push(0)
        setData(d);
    }, [])

    const renderItem = ({ item }) => {
        return(
            <View style={{flex: 1, height: 100, margin: 3, borderColor: "red", borderWidth: 1}}>
            { item > 0 && 
                <Text>hello {item}</Text>
            }
            </View>
        )       
    }

    return loaded ? (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <View style={{height: 50, width: "100%", borderColor: "black", borderWidth: 1, flexDirection: "row", justifyContent: "center", alignItems: "flex-start"}}>
                <Text>icon</Text>
                <TextInput style={{height: 50, flex: 1}} value={filter} placeholder="search" onChangeText={(e)=>setFilter(e)}/>
                <Text>icon</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
                style={{flex: 1, width: "100%"}}
                numColumns={3}
            />
            <View style={{height: 50, width: "100%", flexDirection: "row"}}>
                <TouchableOpacity onPress={()=>navigation.navigate("Main")} style={{flex: 1, borderColor: "red", borderWidth: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text>return</Text>
                </TouchableOpacity>
                <View style={{flex: 3, borderColor: "green", borderWidth: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text>gold</Text>
                </View>
                <View style={{flex: 2, borderColor: "blue", borderWidth: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text>items</Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    ) : 
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>loading...</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})