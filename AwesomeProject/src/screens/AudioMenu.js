import React from 'react'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Slider,
  Text,
  StatusBar,
} from 'react-native'

import useGlobalState from '../globalState'
export default AudioMenu = ({navigation}) => {
    const [,actions] = useGlobalState()
    return(

        <View style ={styles.mainView}>

            <View style={styles.headerBox}>
                <Text style={{fontSize: 25, borderColor: 'rgba(0,0,0,2)',
                borderWidth: 2.0, marginLeft: -2.0, marginTop: -2.0, marginBottom: -2.0,
                padding: 4.0}}>
                Settings
                </Text>

                <Text style={{fontSize: 25}}> Audio </Text>
            </View>


            <View style={styles.sliderView}>
              <Text style={styles.sliderFont}> Music </Text>
              <Slider style={styles.sliderSlide}
              />
            </View>

            <View style={styles.sliderView}>
              <Text style={styles.sliderFont}> Ambience </Text>
              <Slider style={styles.sliderSlide}
              />
            </View>

            <View style={styles.sliderView}>
                <Text style={styles.sliderFont}> Sound FX </Text>
                <Slider style={styles.sliderSlide}
                />
            </View>

            <View style={styles.base}>
            </View>



        </View>








    )
}


const styles = StyleSheet.create({



  mainView: {
    //backgroundColor: Colors.white,
    //borderColor: Colors.black,
    borderWidth: 2.0,
    width: 390,
    height: 500,
    justifyContent: 'center',
    padding: 0.0,
  },

  headerBox: {
    //backgroundColor: Colors.white,
    //borderColor: Colors.black,
    flex: 1.5,
    borderWidth: 2.0,
    flexDirection: 'row',
    marginTop: -2.0,
    marginLeft: -2.0,
    marginRight: -2.0,
    //width: 390,
  },

  sliderView: {
      //borderColor: Colors.black,
      //borderWidth: 1,
      padding: 10,
      flexDirection: 'row',
      marginTop: 10,
      height: 0,
      flex: 1
  },

    base: {
        //borderColor: Colors.black,
        //borderWidth: 1,
        flexDirection: 'row',
        marginTop: 0,
        height: 0,
        flex: 7
    },

  sliderSlide: {

     flex: 2,
     flexDirection: 'row',
     justifyContent: 'flex-end',
     height: 30,

  },

  sliderFont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 20,
    height: 30,
  },

  credits: {

    marginTop: 10,
    marginLeft: 312,
    fontSize: 20,
    //backgroundColor: 'rgba(170,220,156,2)',
    //borderColor: Colors.black,
    borderWidth: 2.0,
  }

});