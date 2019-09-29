import React from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import CustomTabBarItem from './CustomTabBarItem'

export default CustomTabBar = ({navigation}) => {   
    const routes = navigation.state.routes;
    const navigationHandler = (routeName) => {
        navigation.navigate(routes[routeName].routeName);
    }
    return (
        <View style={styles.container}>
        {
            routes.map((route, index) => {
                return (
                    <View style={styles.tabBarItem} key={index}>
                        <CustomTabBarItem
                            key={route.key}
                            routeName={route.routeName}
                            onPress={() => navigationHandler(index)}
                            focused={navigation.state.index === index}
                            index={index}
                        />
                    </View>
                )
            })
        }
        </View>
    )
}
  
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'center',
        height: 56,
        width: '100%'
    },
    tabBarItem: {
        flex: 1,
        alignItems: 'center'
    }
});