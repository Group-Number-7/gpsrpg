import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native'
import Axios from 'axios'
import Images from '../assets/images';
import useGlobalState from '../globalState'
import ItemFinder from '../components/ItemFinder'
import constants from '../config/constants';

export default CharacterScreen = ({navigation}) => {
    const [selectedType, setSelectedType] = useState("")
    const [modalShow, setModalShow] = useState(false)
    const [{userId, equippedEquipment, stats, calcStats}, actions] = useGlobalState()
    const [Equipment, setEquipment] = useState([])
    const [itemsByType, setItemsByType] = useState()
    const [equipped, setEquipped] = useState()

    useEffect(()=>{
//        actions.getNewEquipment("basic_sword")
        Axios.get(`${constants.server_add}/equipment/${userId}`).then(({data})=>{
            setEquipment(data);
        })
    }, [])


    const selectItemsByType = () => {
        setItemsByType(Equipment.filter((eq, index) => {
            return eq.type === selectedType
        }))
        setModalShow(true)
    }

    const handlePress = (type) => {
        if(type === selectedType){
            setSelectedType("")
            return
        }
        setSelectedType(type)
        setEquipped(equippedEquipment[type])
    }

    const itemDisplay = (name) => {
        const image = Images["sword"];
        return (
            <>
            <View style={{flex: 1, width: "100%", padding: 20}}>
                <Image source={image} style={{flex: 1, width: "100%", borderColor: "black", borderWidth: 1, borderRadius: 10}} />
            </View>
            <View style={{flex: 1, width: "90%", borderColor: "black", borderTopWidth: 1, padding: 10, flexDirection: "row", flexWrap: "wrap"}}>
                {
                    Object.keys(equipped.calcStats).map((stat, index)=>{
                        return(
                            <Text style={{width: "50%"}}key={index}>{stat}: {equipped.calcStats[stat]}</Text>
                        )
                    })
                }
            </View>
            </>
        )
    }

    const StatView = () => {
        return (
            <View style={{flex: 1, height: "100%", width: "100%", padding: 10}}>
                <View style={{flex: .5, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", borderBottomColor: "black", borderBottomWidth: 1}}>
                    <Text style={{fontSize: 16, flex: 1, minWidth: "9%"}}>Stat</Text>
                    <Text style={{flex: 1, textAlign: "center"}}> = </Text>
                    <Text style={{flex: 1}}>Base</Text> 
                    <Text style={{flex: 1, textAlign: "center"}}> + </Text>
                    <Text style={{flex: 1, minWidth: "9%"}}>Equipment</Text> 
                    <Text style={{flex: 1, textAlign: "center"}}> = </Text> 
                    <Text style={{flex: 1}}>Total</Text>
                </View>
                {
                    Object.keys(stats).map((stat, i) => {
                        let eq_stat = Object.keys(equippedEquipment).reduce((prev, curr, i)=>{return prev + equippedEquipment[curr].calcStats[stat]}, 0)
                        return (
                            <View style={{flex: 1, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} key={`${stat}${i}`}>
                                <Text style={{fontSize: 16, flex: 1, minWidth: "9%"}}>{stat.toUpperCase()}</Text>
                                <Text style={{flex: 1, textAlign: "center"}}> = </Text>
                                <Text style={{flex: 1}}>{stats[stat]}</Text> 
                                <Text style={{flex: 1, textAlign: "center"}}> + </Text>
                                <Text style={{flex: 1, minWidth: "9%"}}> {eq_stat}</Text> 
                                <Text style={{flex: 1, textAlign: "center"}}> = </Text> 
                                <Text style={{flex: 1}}>{calcStats[stat]}</Text>
                            </View>
                        )
                    })
                }
            </View>
            )
    }
    return(
        <View style={styles.container}>
            <Modal visible={modalShow} presentationStyle="overFullScreen" onDismiss={()=>setModalShow(false)}>
                {itemsByType && <ItemFinder items={itemsByType} close={()=>setModalShow(false)} equipped={equipped} setEq={setEquipped}/> }
            </Modal>
            <View style={{flex: 1.5, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <View style={{flex: 1, height: "80%", borderColor: "black", borderWidth: 2, borderBottomWidth: 0}}>
                    <TouchableOpacity onPress={() => handlePress("weapon")} style={styles.menuItem}>
                        <Text>weapon</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handlePress("offhand")} style={styles.menuItem}>
                        <Text>offhand</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handlePress("jewelry")} style={styles.menuItem}>
                        <Text>jewelry</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1.7, height: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Image source={Images.man} resizeMode="center" style={{width: "70%", height: "100%"}} />
                </View>
                <View style={{flex: 1, height: "100%", borderColor: "black", borderWidth: 2, borderTopWidth: 0, borderBottomWidth: 0}}>
                    <TouchableOpacity onPress={()=>handlePress("head")} style={styles.menuItem}>
                        <Text>head</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handlePress("chest")} style={styles.menuItem}>
                        <Text>chest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handlePress("legs")} style={styles.menuItem}>
                        <Text>legs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handlePress("feet")} style={[styles.menuItem, { borderBottomWidth: 0}]}>
                        <Text>feet</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1, width: "100%", borderTopWidth: 2, borderTopColor: "black", flexDirection: "row"}}>
                {selectedType ? <>
                    <View style={{flex: 1, height: "100%", justifyContent: "center", alignItems: "center", borderColor: "black", borderRightWidth: 2}}>
                        { equipped ? 
                            itemDisplay(selectedType) 
                            :
                            <View style={{flex: 1, height: "100%", justifyContent: "center", alignItems: "center"}}>
                                <Text>No {selectedType} equipped</Text>
                            </View>
                        }
                    </View>
                    <View style={{flex: 1, height: "100%", justifyContent: "center", alignItems: "center"}}>
                        <TouchableOpacity onPress={selectItemsByType} style={{height: 100, width: "70%", borderColor: "black", borderWidth: 1, borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                            <Text>Change</Text>
                        </TouchableOpacity>
                    </View></>
                        :
                    <StatView />
                }
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