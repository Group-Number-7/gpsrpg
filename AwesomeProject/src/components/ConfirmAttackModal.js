import React from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, Modal, Image, Dimensions, StyleSheet } from 'react-native'

import Images from '../assets/images'

export default function ConfirmAttackModal({ show, close, enemy, navigation }){

    return (
        <Modal
            visible={show}
            presentationStyle="overFullScreen"
            transparent={true}
        >
            <SafeAreaView style={{flex: 1, backgroundColor: "rgba(1,1,1,.5)", justifyContent: "center", alignItems: "center", padding: 20}}>
                <View style={{flex: .5, width: "100%", padding: 20, justifyContent: "center", alignItems: "center"}}>
                    <View style={{height: "80%", width: "70%", justifyContent: "center", alignItems: "center"}}>
                        <Image source={Images.enemy} style={{height: "80%", width: "80%"}} resizeMode="contain"/>
                    </View>
                </View>
                <View style={{flex: 1, width: "100%", justifyContent: "space-between", alignItems: "center"}}>
                    { enemy &&
                        <Text style={{color: "white", margin: 3, height: 50}}>{enemy.name}</Text>
                    }
                    { enemy &&
                        Object.keys(enemy.stats).map((stat)=>{
                            return <Text key={stat} style={{textAlign: "left", color: "white", margin: 3}}>{stat}: {enemy.stats[stat]}</Text>
                        })
                    }
                    <View style={{flex: 1.5, paddingBottom: 50, width: "100%", flexDirection: "row", alignItems: "center"}}>
                        <TouchableOpacity onPress={close} style={styles.button}>
                            <Text style={{color: "black"}}>Attack</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={close} style={styles.button}>
                            <Text style={{color: "black"}}>Run</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

const styles=StyleSheet.create({
    button: {flex: 1, height: 50, margin: 20, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 10}
})