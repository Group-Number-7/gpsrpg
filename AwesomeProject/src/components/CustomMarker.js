import React from 'react'
import { View, Image } from 'react-native'
import { Marker } from 'react-native-maps'

export default CustomMarker = ({coord, source}) => {
    const image = require("../assets/images/enemy.png");
    return(
        <Marker coordinate={coord}>
            <View style={{height: 45, width: 30}}>
                <Image source={source || image} style={{height: "100%", width: "100%"}}/>
            </View>
        </Marker>
    )
}