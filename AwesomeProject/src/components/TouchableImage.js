import React from 'react'
import {Image, TouchableOpacity} from 'react-native'

export default function TouchableImage({src, style, imgStyle, onPress, resizeMode}){
    return(
        <TouchableOpacity onPress={onPress} resizeMode={resizeMode} style={[{justifyContent: "center", alignItems: "center"}, style]}>
            <Image source={src} style={[{height: "100%", width: "100%"}, imgStyle]} resizeMode={resizeMode}/>
        </TouchableOpacity>
    )
}