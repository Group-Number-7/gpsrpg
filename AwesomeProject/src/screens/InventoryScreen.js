import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

export default function InventoryScreen({navigation}){

    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>
                Inventory
            </Text>
            <TouchableOpacity style={{position: "absolute", bottom: 50, width: 70, height: 70, justifyContent: "center", alignItems: "center", borderRadius: 35, borderWidth: 3, borderColor: "black"}} onPress={()=>navigation.navigate("Main")}>
                <Text>X</Text>
            </TouchableOpacity>
        </View>
    )
}