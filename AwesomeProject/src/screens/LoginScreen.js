import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useStateValue } from '../context/Context'

import auth from '@react-native-firebase/auth';

export default LoginScreen = ({navigation}) => {

    const [,dispatch] = useStateValue();
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [err, setErr] = useState("")
 
    useEffect(() => {
        const onAuthStateChanged = (user) => {
            console.log("user", user);
            if(user){
                dispatch({type: "login"})
                navigation.navigate("Landing")
            }
        }
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const handlePress = () => {
        if(email.length && pass.length){
            auth().signInWithEmailAndPassword(email.trim(), pass).then((user)=>{
                if(user){
                    dispatch({type: "login"})
                    navigation.navigate("Landing")
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
                    default: 
                        setErr("Error logging in");
                }
            })
        }
    }
 
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={{width: "100%", textAlign: "center", color: "red"}}>{err}</Text>
        <TextInput value={email} onChangeText={(e)=>setEmail(e)}
            style={{backgroundColor: "grey", borderWidth: 2, borderColor: "black", width: "80%"}}/>
        <TextInput value={pass} onChangeText={(e)=>setPass(e)}
            style={{backgroundColor: "grey", borderWidth: 2, borderColor: "black", width: "80%"}}/>
        <TouchableOpacity onPress={handlePress} style={{height: 100, width: "80%", justifyContent: "center", alignItems: "center", backgroundColor: "grey"}}>
            <Text>Login</Text>
        </TouchableOpacity>
      <Text>logging in...</Text>
    </View>
  );
}