import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native'
import Axios from 'axios'
import Images from '../assets/images';
import useGlobalState from '../globalState'
import ItemFinder from '../components/ItemFinder'
import constants from '../config/constants';

export default CharacterScreen = ({navigation}) => {
    const [selectedType, setSelectedType] = useState("")
    const [newItem, setNewItem] = useState("")
    const [modalShow, setModalShow] = useState(false)
    const [{userId, equippedEquipment}, actions] = useGlobalState()
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

    const getEquipped = (type) => {
        setSelectedType(type)
        setEquipped(equippedEquipment.find((eq, i)=>{
            return eq.type === type
        }))
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
    return(
        <View style={styles.container}>
            <Modal visible={modalShow} presentationStyle="overFullScreen" onDismiss={()=>setModalShow(false)}>
                {itemsByType && <ItemFinder items={itemsByType} close={()=>setModalShow(false)}/> }
            </Modal>
            <View style={{flex: 1.5, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <View style={{flex: 1, height: "80%", borderColor: "black", borderWidth: 2, borderBottomWidth: 0}}>
                    <TouchableOpacity onPress={()=>getEquipped("weapon")} style={styles.menuItem}>
                        <Text>weapon</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>getEquipped("offhand")} style={styles.menuItem}>
                        <Text>offhand</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>getEquipped("jewelry")} style={styles.menuItem}>
                        <Text>jewelry</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1.7, height: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Image source={Images.man} resizeMode="center" style={{width: "70%", height: "100%"}} />
                </View>
                <View style={{flex: 1, height: "100%", borderColor: "black", borderWidth: 2, borderTopWidth: 0, borderBottomWidth: 0}}>
                    <TouchableOpacity onPress={()=>getEquipped("head")} style={styles.menuItem}>
                        <Text>head</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>getEquipped("chest")} style={styles.menuItem}>
                        <Text>chest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>getEquipped("legs")} style={styles.menuItem}>
                        <Text>legs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>getEquipped("feet")} style={[styles.menuItem, { borderBottomWidth: 0}]}>
                        <Text>feet</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1, width: "100%", borderTopWidth: 2, borderTopColor: "black", flexDirection: "row"}}>
                {selectedType ? <>
                    <View style={{flex: 1, height: "100%", justifyContent: "center", alignItems: "center", borderColor: "black", borderRightWidth: 2}}>
                        { itemDisplay(selectedType) }
                    </View>
                    <View style={{flex: 1, height: "100%", justifyContent: "center", alignItems: "center"}}>
                        { newItem ? <>
                            {itemDisplay(selectedType)}</>
                                :
                            <TouchableOpacity onPress={selectItemsByType} style={{height: 100, width: "70%", borderColor: "black", borderWidth: 1, borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                                <Text>Change</Text>
                            </TouchableOpacity>
                        }
                    </View></>
                        :
                    <View style={{flex: 1, height: "100%", width: "100%"}}>
                            <TouchableOpacity onPress={selectItemsByType} style={{height: 100, width: "70%", borderColor: "black", borderWidth: 1, borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                                <Text>Equip Item</Text>
                            </TouchableOpacity>
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