import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native'
import Axios from 'axios'
import Images from '../assets/images';
import useGlobalState from '../globalState'
import ItemFinder from '../components/ItemFinder'

export default CharacterScreen = ({navigation}) => {
    const [selectedType, setSelectedType] = useState("")
    const [newItem, setNewItem] = useState("")
    const [modalShow, setModalShow] = useState(false)
    const [{level, equipment}, actions] = useGlobalState()
    const [Equipment, setEquipment] = useState([])
    const [itemsByType, setItemsByType] = useState([])

    useEffect(()=>{
        actions.getNewEquipment("better_sword");
    }, [])

    useEffect(()=>{
        console.log("eq changed", equipment.length)
        setEquipment(equipment);
    },[equipment])

    const selectItemsByType = () => {
        let filtered_eq = Equipment.filter((eq, index) => {
            return eq.type === selectedType
        })
        setItemsByType(filtered_eq)
        setModalShow(true)
    }

    const itemDisplay = (name) => {
        const image = Images["sword"];
        return(
            <>
            <View style={{flex: 1, width: "100%", padding: 20}}>
                <Image source={image} style={{flex: 1, width: "100%", borderColor: "black", borderWidth: 1, borderRadius: 10}} />
            </View>
            <View style={{flex: 1, width: "90%", borderColor: "black", borderTopWidth: 1, padding: 10}}>
                {
                    ["hp", "mana", "attack"].map((val, index)=>{
                        return(
                            <Text style={{textAlign: "center", width: "100%"}} key={index}>{val}: {index}</Text>
                        )
                    })
                }
            </View>
            </>
        )
    }
    return(
        <View style={styles.container}>
            <Modal visible={modalShow} presentationStyle="overFullScreen" onDismiss={()=>setModalShow(false)}>
                {itemsByType && <ItemFinder items={itemsByType} close={()=>setModalShow(false)}/> }
            </Modal>
            <View style={{flex: 1.5, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <View style={{flex: 1, height: "80%", borderColor: "black", borderWidth: 2, borderBottomWidth: 0}}>
                    <TouchableOpacity onPress={()=>setSelectedType("weapon")} style={styles.menuItem}>
                        <Text>weapon</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setSelectedType("weapon")} style={styles.menuItem}>
                        <Text>offhand</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setSelectedType("weapon")} style={styles.menuItem}>
                        <Text>jewelry</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1.7, height: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Image source={Images.man} resizeMode="center" style={{width: "70%", height: "100%"}} />
                </View>
                <View style={{flex: 1, height: "100%", borderColor: "black", borderWidth: 2, borderTopWidth: 0, borderBottomWidth: 0}}>
                    <TouchableOpacity onPress={()=>setSelectedType("weapon")} style={styles.menuItem}>
                        <Text>head</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setSelectedType("weapon")} style={styles.menuItem}>
                        <Text>chest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setSelectedType("weapon")} style={styles.menuItem}>
                        <Text>legs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setSelectedType("weapon")} style={[styles.menuItem, { borderBottomWidth: 0}]}>
                        <Text>feet</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1, width: "100%", borderTopWidth: 2, borderTopColor: "black", flexDirection: "row"}}>
                {selectedType.length ?<>
                    <View style={{flex: 1, height: "100%", justifyContent: "center", alignItems: "center", borderColor: "black", borderRightWidth: 2}}>
                        { itemDisplay(selectedType) }
                    </View>
                    <View style={{flex: 1, height: "100%", justifyContent: "center", alignItems: "center"}}>
                        { newItem.length ?<>
                            {itemDisplay(selectedType)}</>
                                :
                            <TouchableOpacity onPress={selectItemsByType} style={{height: 100, width: "70%", borderColor: "black", borderWidth: 1, borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                                <Text>Change</Text>
                            </TouchableOpacity>
                        }
                    </View></>
                        :
                    <View>
                        {
                            Equipment.map((eq, index)=>{
                                return <Text key={index}>{eq.name}</Text>
                            })
                        }
                    </View>
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