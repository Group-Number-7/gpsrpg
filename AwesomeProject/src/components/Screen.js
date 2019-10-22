import React from 'react'
import { View, SafeAreaView, Platform } from 'react-native'

export default function Screen({children}, rest){
    return(
        <View style={{flex: 1, width: "100%"}}>
            {children}
        </View>
    )
}