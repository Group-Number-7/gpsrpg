import React from 'react'
import {View, Image, TouchableOpacity} from 'react-native'

export default function TouchableImage({src, style, onPress}){

    return(
        <TouchableOpacity onPress={onPress} style={[{justifyContent: "center", alignItems: "center"}, style]}>
            <Image source={src} style={{height: "100%", width: "100%"}}/>
        </TouchableOpacity>
    )
}