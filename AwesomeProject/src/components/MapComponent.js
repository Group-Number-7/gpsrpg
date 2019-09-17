import React, {useState, useRef, useEffect} from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, MapViewAnimated } from 'react-native-maps';

import MapStyle from '../assets/mapStyle.json'

import { useStateValue } from '../context/Context';
import {useDimensions} from '../hooks/useDimensions';

export default MapComponent = (({children, onReady}) => {

    const {width, height} = useDimensions();
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.003;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const mapRef = useRef();
    const [{pos},] = useStateValue();
    const [camera, setCamera] = useState()

    useEffect(()=>{
        setCamera({
            center: {
               latitude: pos.latitude,
               longitude: pos.longitude,
           },
            pitch: 0,
            heading: 0,    
            altitude: pos.altitude,    
           zoom: 18
        })
    }, [])

    useEffect(()=>{
        var camera = {
            center: {
               latitude: pos.latitude,
               longitude: pos.longitude,
            },
           pitch: 0,
           altitude: pos.altitude,
           heading: 0,
           zoom: 18 
        }
        if(mapRef.current)  
            mapRef.current.animateCamera(camera, {duration: 500})
    }, [pos])

    return camera ? (
        <MapView
            ref={mapRef}
            onLayout={onReady}
            camera={camera}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            moveOnMarkerPress={false}
            customMapStyle={MapStyle}
            showsCompass={false}
            showsBuildings={false}
            showsIndoors={false}
            showsIndoorLevelPicker={false}
            pitchEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
            zoomTapEnabled={false}
            toolbarEnabled={false}
            loadingEnabled={false}
            zoomControlEnabled={false}
        >
            {children}
        </MapView>
    ) : null
})

const height = Dimensions.get("window").height
const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
      top: -height*.125,
    }
});