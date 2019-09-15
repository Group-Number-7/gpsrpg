import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import Axios from 'axios';
import constants from '../config/constants';

export default function InventoryScreen({navigation}){
    const [t, setT] = useState(`${constants.server_add} no data`)
    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>
                Inventory
                {t}
            </Text>
            <TouchableOpacity style={{position: "absolute", bottom: 50, width: 70, height: 70, justifyContent: "center", alignItems: "center", borderRadius: 35, borderWidth: 3, borderColor: "black"}} onPress={()=>navigation.navigate("Main")}>
                <Text>X</Text>
            </TouchableOpacity>
        </View>
    )
}