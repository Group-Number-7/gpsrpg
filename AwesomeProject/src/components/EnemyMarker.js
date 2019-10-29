import React from 'react'
import { View, Image } from 'react-native'
import { Marker } from 'react-native-maps'
import useGlobalState from '../globalState'

export default EnemyMarker = ({coord, source, press}) => {
    const image = require("../assets/images/enemy.png");
    const [state, actions] = useGlobalState()
    return(
        <Marker coordinate={coord} onPress={press}>
            <View style={{height: 45, width: 30}}>
                <Image source={source || image} style={{height: "100%", width: "100%"}}/>
            </View>
        </Marker>
    )
}