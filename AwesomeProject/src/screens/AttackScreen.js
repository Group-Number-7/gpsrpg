import React, { useEffect, useState} from 'react'
import { View, Text } from 'react-native'

const AttackScreen = ({navigation}) => {
    const [enemy, setEnemy] = useState(navigation.getParam('enemy', {}))
    return enemy && (
        <View>
            <Text>
                {enemy.name}
            </Text>
        </View>
    )
}

export default AttackScreen