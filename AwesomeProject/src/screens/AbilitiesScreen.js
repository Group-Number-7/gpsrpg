import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList } from 'react-native'
import Axios from 'axios'
import SpellIcons from '../assets/images/spell_icons'
import SpellInfo from '../assets/spell_info'
import useGlobalState from '../globalState'
import constants from '../config/constants'

export default AbilitiesScreen = ({navigation}) => {
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
    return(
        <View style={styles.container}>
            <Modal visible={modalShow} presentationStyle="overFullScreen" onDismiss={()=>setModalShow(false)}>
                {itemsByType && <ItemFinder items={itemsByType} close={()=>setModalShow(false)} equipped={equipped} setEq={setEquipped}/> }
            </Modal>
            <View style={styles.equippedSpellsContainer}>
                <Image source = {SpellIcons["frostarmor"]} style={styles.spellIconImage}/>
                <Image source = {SpellIcons["healingtouch"]} style={styles.spellIconImage}/>
                <Image source = {SpellIcons["shiv"]} style={styles.spellIconImage}/>
            </View>
            <View style={[styles.equippedSpellsContainer, {backgroundColor: 'red'}]}>
                <Image source = {SpellIcons["shiv"]} style={styles.spellIconImage}/>
                <Image source = {SpellIcons["shiv"]} style={styles.spellIconImage}/>
            </View>
            <View style={styles.availableSpellsContainer}> 
                <Text>{SpellInfo["frostarmor"]['description']}</Text>
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
    equippedSpellsContainer: {
        flex: 2,
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        backgroundColor: "green"
    },
    availableSpellsContainer: {
        flex: 6,
        backgroundColor: "blue"
    },
    spellIconImage: {
        height: "70%",
        margin: "15%",
        borderRadius: 10,
        aspectRatio:1/1
    }
})