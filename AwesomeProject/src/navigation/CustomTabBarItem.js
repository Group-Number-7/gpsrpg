import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native'

export default CustomTabBarItem = ({index, focused, routeName, onPress}) => {
    const onSelect = (routeName) => {    
        onPress(routeName);
    }
    return (
        <TouchableWithoutFeedback
            onPress={() => onSelect(routeName)}
        >
            <View style={[styles.container, focused ? styles.active : styles.inactive, index === 0 ? { borderRightColor: "black", borderRightWidth: 2 } : {}, index === 2 ? { borderLeftColor: "black", borderLeftWidth: 2 } : {}]}> 
                <Text style={styles.textStyle}>{routeName}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      alignItems: 'center',
      justifyContent: "center",
      borderBottomColor: "black",
      borderBottomWidth: 2
    },
    active: {
        backgroundColor: "white",
        borderBottomWidth: 0,
    },
    inactive: {
      backgroundColor: "grey"
    },
    textStyle: {
      color: 'black',
      fontSize: 13
    }
});