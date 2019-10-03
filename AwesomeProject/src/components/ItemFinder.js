import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import FastImage from 'react-native-fast-image'

export default ItemFinder = ({items, close}) => {
    const [sortedItems, setSortedItems] = useState([])
    const [pressed, setPressed] = useState()
    const ITEM_HEIGHT = 80;

    useEffect(()=>{
        items.sort((a, b) => {
            var suma = 0, sumb = 0
            if(a.calcStats && b.calcStats){
                for(i in a.calcStats){
                    suma += a.calcStats[i]
                }
                for(i in b.calcStats){
                    sumb += b.calcStats[i]
                }
            } else {
                console.log("a", a, "b", b)
            }
            return suma < sumb ? 1 : -1;
        })
        setSortedItems(items)
    }, [items])

    const renderItem = ({item}) => {
        return(
            <View style={{height: ITEM_HEIGHT, flex: 1, borderColor: "black", borderWidth: 2, borderRadius: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-around", padding: 5}}>
                <TouchableOpacity onPress={()=>setPressed(item)} style={{flex: 1.5, height: "100%", justifyContent: "center", alignItems: "center", margin: 3}}>
                    <FastImage style={{height: "70%", width: "100%"}} resizeMode="center" source={{uri: "https://spng.pngfind.com/pngs/s/23-238265_minecraft-sword-png-minecraft-epic-diamond-sword-transparent.png"}}/>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
                <View style={{flex: 1, height: "100%", justifyContent: "space-around", alignItems: "stretch", margin: 3}}>
                    <Text style={{textAlign: "left", width: "100%"}}>HP: {item.calcStats["hp"]}</Text>
                    <Text style={{textAlign: "left", width: "100%"}}>Attack: {item.calcStats["attack"]}</Text>
                </View>
                <View style={{flex: 1.1, height: "100%", justifyContent: "space-around", alignItems: "stretch", margin: 3}}>
                    <Text style={{textAlign: "left", width: "100%"}}>Res: {item.calcStats["res"]}</Text>
                    <Text style={{textAlign: "left", width: "100%"}}>Def: {item.calcStats["def"]}</Text>
                </View>
                <View style={{flex: 1, height: "100%", justifyContent: "space-around", alignItems: "stretch", margin: 3}}>
                    <Text style={{textAlign: "left", width: "100%"}}>Magic: {item.calcStats["magic"]}</Text>
                    <Text style={{textAlign: "left", width: "100%"}}>Mana: {item.calcStats["mana"]}</Text>
                </View>
            </View>
        )
    }
    return(
        <View style={{flex: 1, width: "100%", backgroundColor: "white", justifyContent: "center", alignItems: "center", padding: 10}}>
            <FlatList
                data={sortedItems}
                renderItem={renderItem}
                keyExtractor={(item, index)=> item.id + String(index)}
                style={{flex: 1, width: "100%", margin: 5}}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                getItemLayout={(data, index) => (
                    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                  )}
                ItemSeparatorComponent={()=><View style={{height: 10, width: "100%",marginBottom: 5, borderBottomColor: "black", borderBottomWidth: 1}}></View>}
            />
            <View style={{height: 100, width: "100%", justifyContent: "center", alignItems: "center", padding: 15, borderTopColor: "black", borderTopWidth: 2}}>
                <TouchableOpacity onPress={close} style={{height: 75, width: 75, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "black", borderRadius: 38}}>
                    <Text style={{width: "100%", textAlign:"center"}}>Close</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}