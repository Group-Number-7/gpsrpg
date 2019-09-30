import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import useGlobalState from '../globalState'
export default MenuScreen = ({navigation}) => {
    const [,actions] = useGlobalState()
    return(
        <View style={{flex: 1, widht: "100%"}}>
            <TouchableOpacity onPress={()=>actions.logout()} style={{width: 100, height: 100, borderWidth: 1, borderColor: "black"}}>
                <Text>logout</Text>
            </TouchableOpacity>
        </View>
    )
}