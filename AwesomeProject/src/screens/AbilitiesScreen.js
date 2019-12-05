import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList, Dimensions, Button } from 'react-native'
import Axios from 'axios'
import SpellIcons from '../assets/images/spell_icons'
import SpellInfo from '../assets/spell_info'
import useGlobalState from '../globalState'
import constants from '../config/constants'
import { ScrollView } from 'react-native-gesture-handler'

export default AbilitiesScreen = ({navigation}) => {
    const [selectedType, setSelectedType] = useState("")
    const [modalShow, setModalShow] = useState(false)
    const [{userId, equippedEquipment, stats, calcStats}, actions] = useGlobalState()
    const [Equipment, setEquipment] = useState([])
    const [selectedAbility, setSelectedAbility] = useState('frostarmor')
    const [equippedAbilities, setEAs] = useState(["frostarmor", "healingtouch", "shiv", "shiv", "shiv"])
    const [availableAbilities, setAAs] = useState(["frostarmor", "healingtouch", "shiv", "shiv", "shiv", "shiv", "shiv", "shiv", "shiv", "shiv", "shiv", "shiv"])

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

    const abilityIconPress = (i) => {
        setSelectedAbility(availableAbilities[i]);
        console.log(selectedAbility);
        setModalShow(true);
    }

    const renderAbility = ({ item, index }) => {
        console.log(item);
        return(
            <TouchableOpacity style={{borderColor: "black", borderWidth: 1, borderRadius: 5, alignItems: "center", width:'80%', marginLeft:"10%", backgroundColor:'white'}}
            onPress={()=>abilityIconPress(index)}>
                <View style={{flexDirection:"row"}}>
                    <Image source={SpellIcons[item]} onError={(e)=>console.log("err", e)}/>
                    <View>
                        <Text>{SpellInfo[item]['title']}</Text>
                        <Text>{SpellInfo[item]['description']}</Text>
                    </View>
                </View>
                
            </TouchableOpacity>
        )       
    }

    return(
        <View style={styles.container}>
            <Modal style={styles.abilityModal} visible={modalShow} presentationStyle="pageSheet">
                <Image source = {SpellIcons[selectedAbility]}/>
                <Text>{SpellInfo[selectedAbility]['title']}</Text>
                <Text>{SpellInfo[selectedAbility]['description']}</Text>
                <Button onPress={()=>{setModalShow(false)}} title="Go Back"/>
            </Modal>
            <View style={styles.equippedSpellsContainer}>
                <TouchableOpacity onPress={()=>abilityIconPress(0)} style={styles.spellIconImage}>
                <Image source = {SpellIcons["frostarmor"]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>abilityIconPress(1)} style={styles.spellIconImage}>
                <Image source = {SpellIcons["healingtouch"]}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>abilityIconPress(2)} style={styles.spellIconImage}>
                <Image source = {SpellIcons["shiv"]}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.equippedSpellsContainer, {backgroundColor: 'red'}]}>
                <Image source = {SpellIcons["shiv"]} style={styles.spellIconImage}/>
                <Image source = {SpellIcons["shiv"]} style={styles.spellIconImage}/>
            </View>
            <View style={styles.availableSpellsContainer}> 
            <FlatList
                data={availableAbilities}
                renderItem={renderAbility}
                keyExtractor={(abilityName, index) => String(index)}
                style={{flex: 1, width: "100%"}}
                numColumns={1}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    abilityModal: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.5,
        backgroundColor: 'rgba(30, 30, 40, 0.3)'
    },
    spellIconImage: {
        height: "70%",
        margin: "15%",
        borderRadius: 10,
        aspectRatio:1/1
    },
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