import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useStateValue } from '../context/Context'

export default LoginScreen = ({navigation}) => {
    const [{loggedIn},dispatch] = useStateValue();
    
    useEffect(()=>{
        if(loggedIn)
            navigation.navigate("App");
    },[])

    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <TextInput />
            <TextInput />
            <TouchableOpacity onPress={()=>{
                dispatch({type:"login"})
                navigation.navigate("App")
            }}>
                <Text>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    )
}