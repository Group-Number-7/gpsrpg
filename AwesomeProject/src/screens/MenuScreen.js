import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import useGlobalState from '../globalState'
export default MenuScreen = ({navigation}) => {
    const [,actions] = useGlobalState()
    return(
        <View style={styles.container}>
            <Text style ={styles.pagetitle}>Main Menu</Text>
            <View style={styles.btnContainer}>

                <TouchableOpacity
                    onPress={()=>actions.logout()}
                    style={styles.userBtn}
                >
                        <Text style= {styles.btnTxt}>logout</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress = {() => navigation.navigate("Main")}
                    style = {styles.userBtn}
                >
                    <Text style = {styles.btnTxt}>back</Text>
                </TouchableOpacity>


            </View>

            <View style={styles.btnContainer}>

                <TouchableOpacity
                    onPress={()=>navigation.navigate("Audio")}
                    style={styles.userBtn}
                >
                    <Text style= {styles.btnTxt}>Audio</Text>
                </TouchableOpacity>


            </View>



        </View>
    )
}


const styles = StyleSheet.create({
	container: {flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "#05ffb0"},
	pagetitle: { fontSize: 30, textAlign: 'center', margin: 10, color: "red", fontFamily: "DancingScript-Bold"},
	btnContainer:{ flexDirection: "row", justifyContent: "space-between", width: "90%", margin: 10},
	userBtn:{ backgroundColor: "#ffd700", padding: 15, width: "45%"},
	btnTxt:{ fontSize: 18, textAlign: 'center'}
});