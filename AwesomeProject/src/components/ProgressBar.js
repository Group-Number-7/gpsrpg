import React, {useState, useEffect} from 'react'
import { View } from 'react-native'

export default ProgressBar = ({curr, max, color, containerStyle}) => {
    const [progress, setProgress] = useState(curr)

    useEffect(()=>{
        setProgress(curr);
    },[curr])

    return (
        <View style={[{borderRadius: 8, borderColor:"black", borderWidth: 2, backgroundColor: "white"}, containerStyle]}>
            {progress !== undefined && <View style={{width: `${progress / max * 100}%`, backgroundColor: color, height: "100%", borderRadius: 5}} />}
        </View>
    )
}