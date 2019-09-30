import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import useGlobalState from '../globalState'

import auth from '@react-native-firebase/auth';

export default LoginScreen = ({navigation}) => {

    const [,actions] = useGlobalState();
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [err, setErr] = useState("")
 
    useEffect(() => {
        const onAuthStateChanged = (user) => {
            if(user){
                console.log("user", user);
                actions.login({email: user._user.email, fbUid: user._user.uid})
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
                    actions.login()
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
        <TouchableOpacity onPress={()=>navigation.navigate("Signup")} style={{justifyContent: "center", alignItems: "center", marginTop: 10}}>
            <Text>No account?</Text>
        </TouchableOpacity>
    </View>
  );
}