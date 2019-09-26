import React, {useState, useEffect} from 'react'
import { View } from 'react-native'

export default ProgressBar = ({curr, max, color, containerStyle, children}) => {
    const [progress, setProgress] = useState(curr)

    useEffect(()=>{
        setProgress(curr);
    },[curr])

    return (
        <View style={[{borderRadius: 8, borderColor:"black", borderWidth: 2, backgroundColor: "rgb(211,211,211)"}, containerStyle]}>
        { progress !== undefined && 
            <View style={{position: "absolute", top: 0, left: 0, bottom: -.1, width: `${progress / max * 100}%`, backgroundColor: color, borderRadius: 5}}/>
        }
            <View style={{paddingHorizontal: 3}}>
                {children}
            </View>
        </View>
    )
}