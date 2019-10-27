import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import useGlobalState from '../globalState'

import auth from '@react-native-firebase/auth';

export default LoginScreen = ({navigation}) => {

    const [{loggedIn}, actions] = useGlobalState();
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [err, setErr] = useState("")

    const handlePress = () => {
        if(email.length && pass.length){
            console.log(email, pass, "test")
            auth().signInWithEmailAndPassword(email.trim(), pass).then((user)=>{
                if(user){
                    setErr("");
                    actions.login({email: email, cb: (err)=> err ? setErr(err) : navigation.navigate("App")})   
                }
            }).catch((err)=>{
                switch(err.code){
                    case 'auth/wrong-password':
                        setErr("Invalid password");
                        break;
                    case 'auth/invalid-email':
                        setErr("Invalid email");
                        break;
                    case 'auth/user-not-found':
                        setErr("Account not found")
                        break;
                    case 'auth/user-disabled':
                        setErr("Account disabled")
                        break;
                    default: 
                        console.log("err", err.code);
                        setErr("Error logging in");
                        return;
                }
            })
        }
    }
    useEffect(()=>{
        if(loggedIn)
            navigation.navigate("App")
    },[loggedIn])

    return(
        <View style= {styles.container}>
            <Text style={styles.welcome}>GPSRPG</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    onPress={handlePress}
                    style={styles.userBtn}
                >
                    <Text style={styles.btnTxt}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>navigation.navigate("Signup")}
                    style={styles.userBtn}
                >
                    <Text style={styles.btnTxt}>Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#05ffb0"},
	welcome: { fontSize: 30, textAlign: 'center', margin: 10, color: "red", fontFamily: "DancingScript-Bold"},
	input:{ width: '90%', backgroundColor: "#fff", padding: 15, marginBottom: 10},
	btnContainer:{ flexDirection: "row", justifyContent: "space-between", width: "90%"},
	userBtn:{ backgroundColor: "#ffd700", padding: 15, width: "45%"},
	btnTxt:{ fontSize: 18, textAlign: 'center'}
});