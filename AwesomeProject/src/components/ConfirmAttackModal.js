import React from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, Modal, Image, Dimensions } from 'react-native'

import Images from '../assets/images'

const { height, width } = Dimensions.get("screen")

export default function ConfirmAttackModal({ show, close }){

    return (
        <Modal
            visible={show}
            presentationStyle="overFullScreen"
            transparent={true}
        >
            <SafeAreaView style={{flex: 1, backgroundColor: "rgba(1,1,1,.1)", justifyContent: "center", alignItems: "center", padding: 20, borderColor: "red", borderWidth: 2}}>
                <View style={{flex: 1, width: "80%", borderWidth: 2, borderColor: "black", borderRadius: 20, padding: 20}}>
                    <Image source={Images.enemy} style={{height: "100%", width: "100%"}}/>
                </View>
                <TouchableOpacity onPress={close} style={{flex: 1, width: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Text>Run</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    )
}