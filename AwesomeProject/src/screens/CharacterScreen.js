import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Images from '../assets/images';
import useGlobalState from '../globalState'

export default CharacterScreen = ({navigation}) => {
    const [selectedItem, setSelectedItem] = useState("")
    const [newItem, setNewItem] = useState("")
    const [{level}, actions] = useGlobalState()
    const itemDisplay = (name) => {
        const image = Images["sword"];
        return(
            <>
            <View style={{flex: 1, width: "100%", padding: 20}}>
                <Image source={image} style={{flex: 1, width: "100%", borderColor: "black", borderWidth: 1, borderRadius: 10}} />
            </View>
            <View style={{flex: 1, width: "90%", borderColor: "black", borderTopWidth: 1, padding: 10}}>
                {
                    ["hp", "mana", "attack"].map((val, index)=>{
                        return(
                            <Text style={{textAlign: "center", width: "100%"}} key={index}>{val}: {index}</Text>
                        )
                    })
                }
            </View>
            </>
        )
    }
    return(
        <View style={styles.container}>
            <View style={{flex: 1.5, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <View style={{flex: 1, height: "80%", borderColor: "black", borderWidth: 2, borderBottomWidth: 0}}>
                    <TouchableOpacity onPress={()=>setSelectedItem("weapon")} style={styles.menuItem}>
                        <Text>weapon</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setSelectedItem("weapon")} style={styles.menuItem}>
                        <Text>offhand</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setSelectedItem("weapon")} style={styles.menuItem}>
                        <Text>jewelry</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1.7, height: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Image source={Images.man} resizeMode="center" style={{width: "70%", height: "100%"}} />
                </View>
                <View style={{flex: 1, height: "100%", borderColor: "black", borderWidth: 2, borderTopWidth: 0, borderBottomWidth: 0}}>
                    <TouchableOpacity onPress={()=>setSelectedItem("weapon")} style={styles.menuItem}>
                        <Text>head</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setSelectedItem("weapon")} style={styles.menuItem}>
                        <Text>chest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setSelectedItem("weapon")} style={styles.menuItem}>
                        <Text>legs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setSelectedItem("weapon")} style={[styles.menuItem, { borderBottomWidth: 0}]}>
                        <Text>feet</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1, width: "100%", borderTopWidth: 2, borderTopColor: "black", flexDirection: "row"}}>
                {selectedItem.length ?<>
                    <View style={{flex: 1, height: "100%", justifyContent: "center", alignItems: "center", borderColor: "black", borderRightWidth: 2}}>
                        { itemDisplay(selectedItem) }
                    </View>
                    <View style={{flex: 1, height: "100%", justifyContent: "center", alignItems: "center"}}>
                        { newItem.length ?<>
                            {itemDisplay(selectedItem)}</>
                                :
                            <TouchableOpacity onPress={()=>actions.test(level+1)} style={{height: "40%", width: "50%"}}>
                                <Text>Change</Text>
                            </TouchableOpacity>
                        }
                    </View></>
                        :
                    <View>
                        <Text>hello</Text>
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "white"
    },
    menuItem: {
        flex: 1, 
        width: "100%", 
        justifyContent: "center", 
        alignItems: "center", 
        borderBottomColor: "black", 
        borderBottomWidth: 2
    }
})