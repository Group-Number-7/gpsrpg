import React, {useState, useEffect} from 'react'
import {Dimensions} from 'react-native'

export const useDimensions = () => {
    const [dim, setDim] = useState(Dimensions.get("window"));
    useEffect(()=>{
        const resize = (e)=> console.log(e);
        Dimensions.addEventListener('change', resize)
        return () => Dimensions.removeEventListener('change', resize);
    }, []);
    return dim;
}