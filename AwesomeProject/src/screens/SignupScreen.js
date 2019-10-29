import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import useGlobalState from '../globalState'

import auth from '@react-native-firebase/auth';

export default SignupScreen = ({navigation}) => {

  const [,actions] = useGlobalState();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [err, setErr] = useState("")

  const handlePress = () => {
      if(email.length && pass.length && username.length){
        auth().createUserWithEmailAndPassword(email.trim(), pass).then((user)=>{
            if(user){
                console.log("user created")
                actions.signup({email: user.user.email, username: username, nav: ()=>navigation.navigate("App")})
            }
        }).catch((err)=>{
            console.log("err", err.code)
            switch(err.code){
                case 'auth/invalid-email':
                    setErr("Invalid Email");
                    break;
                case 'auth/weak-password':
                    setErr("Password should be at least 6 characters")
                    break;
                case 'auth/email-already-in-use':
                    setErr("Email already in use");
                    break;
                default:
                    setErr("Error signing up");
                    return;
            }
        })
    }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.welcome}>{err}</Text>
        <TextInput 
            value={username} 
            placeholder="username" 
            onChangeText={(e)=>setUsername(e)}
            style={styles.input}
            
        />
        <TextInput 
            value={email} 
            placeholder="email" 
            onChangeText={(e)=>setEmail(e)}
            style={styles.input}
        />
        <TextInput 
            value={pass} 
            placeholder="password" 
            onChangeText={(e)=>setPass(e)}
            style={styles.input}    
        />

        <TouchableOpacity 
               onPress={handlePress} 
               style={styles.userBtn}>
                
                 <Text style={styles.btnTxt}>Create</Text>
         </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#05ffb0"},
	welcome: { fontSize: 30, textAlign: 'center', margin: 10, color: "red", fontFamily: "DancingScript-Bold"},
	input:{ width: '90%', backgroundColor: "#fff", padding: 15, marginBottom: 10},
	//btnContainer:{alignItems: 'center', justifyContent: "center", width : '100%'},
	userBtn:{ backgroundColor: "#ffd700",padding: 10,   width: '90%'},
	btnTxt:{ fontSize: 18, textAlign: 'center', justifyContent: 'center'}
});