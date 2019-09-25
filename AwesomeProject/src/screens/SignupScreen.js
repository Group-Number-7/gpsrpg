import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useStateValue } from '../context/Context'

import auth from '@react-native-firebase/auth';

export default SignupScreen = ({navigation}) => {

  const [,dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("")
 
  const handlePress = () => {
      if(email.length && pass.length){
        auth().createUserWithEmailAndPassword(email.trim(), pass).then((user)=>{
            if(user){
                dispatch({type: "login"});
                navigation.navigate("Landing");
            }
        }).catch((err)=>{
            switch(err.code){
                case 'auth/invalid-email':
                    setErr("Invalid Email");
                    break;
                case 'auth/weak-password':
                    setErr("Password should be at least 6 characters")
                    break;
                case 'auth/email-already-in-use':
                    setErr("Email already in use");
                default:
                    setErr("Error signing up");
                    return;
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
            <Text>Signup</Text>
        </TouchableOpacity>
      <Text>logging in...</Text>
    </View>
  );
}