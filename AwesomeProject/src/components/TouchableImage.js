import React from 'react'
import {View, Image, TouchableOpacity} from 'react-native'

export default function TouchableImage({src, style, imgStyle, onPress}){

    return(
        <TouchableOpacity onPress={onPress} style={[{justifyContent: "center", alignItems: "center"}, style]}>
            <Image source={src} style={[{height: "100%", width: "100%"}, imgStyle]} resizeMode="center"/>
        </TouchableOpacity>
    )
}