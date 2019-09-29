import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default CharacterScreen = ({navigation}) => {
    const character = require("../assets/images/man.png");
    return(
        <View style={styles.container}>
            <View style={{flex: 1.5, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <View style={{flex: 1, height: "80%", borderColor: "black", borderWidth: 2, borderBottomWidth: 0}}>
                    <View style={styles.menuItem}>
                        <Text>sword</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text>offhand</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text>jewelry</Text>
                    </View>
                </View>
                <View style={{flex: 1.7, height: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Image source={character} resizeMode="center" style={{width: "70%", height: "100%"}} />
                </View>
                <View style={{flex: 1, height: "100%", borderColor: "black", borderWidth: 2, borderTopWidth: 0, borderBottomWidth: 0}}>
                    <View style={styles.menuItem}>
                        <Text>head</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text>chest</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text>legs</Text>
                    </View>
                    <View style={[styles.menuItem, { borderBottomWidth: 0}]}>
                        <Text>feet</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 1, width: "100%", borderTopWidth: 2, borderTopColor: "black"}}>
                <Text>hello</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "white"
    },
    menuItem: {
        flex: 1, 
        width: "100%", 
        justifyContent: "center", 
        alignItems: "center", 
        borderBottomColor: "black", 
        borderBottomWidth: 2
    }
})