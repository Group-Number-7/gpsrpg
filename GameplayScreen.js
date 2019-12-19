import React from 'react'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Slider,
  Text,
  StatusBar,
  CheckBox,
} from 'react-native'

import useGlobalState from '../globalState'
export default Gameplay = ({navigation}) => {
    const [,actions] = useGlobalState()




    return(

        <View style ={styles.mainView}>

            <View style={styles.headerBox}>
                <Text style={{fontSize: 25, borderColor: 'rgba(0,0,0,2)',
                borderWidth: 2.0, marginLeft: -2.0, marginTop: -2.0, marginBottom: -2.0,
                padding: 4.0}}>
                Settings
                </Text>
                <Text style={{fontSize: 25}}> Gameplay </Text>
            </View>



             <View style={styles.checkBox}>
                 <CheckBox
                 />
                <Text style={styles.checkFont}> Option 1 </Text>
             </View>


              <View style={styles.checkBox}>
                  <CheckBox
                  />
                 <Text style={styles.checkFont}> Option 2 </Text>
              </View>

              <View style={styles.checkBox}>
                  <CheckBox
                  />
                 <Text style={styles.checkFont}> Option 3 </Text>
              </View>

              <View style={styles.checkBox}>
                <CheckBox
                />
                <Text style={styles.checkFont}> Option 4 </Text>
              </View>





            <View style={styles.base}>
            </View>


            <Text style={styles.credits}> Credits </Text>
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
    marginLeft: 10,
    marginTop: 10
  },

  headerBox: {
    backgroundColor: 'rgba(255,255,255,1)',
    borderColor: 'rgba(0,0,0,1)',
    flex: 1.5,
    borderWidth: 2.0,
    flexDirection: 'row',
    marginTop: -2.0,
    marginLeft: -2.0,
    marginRight: -2.0,
    //width: 390,
  },

    base: {
        //borderColor: Colors.black,
        //borderWidth: 1,
        flexDirection: 'row',
        marginTop: 0,
        height: 0,
        flex: 7
    },

  checkBox: {

     flex: 2,
     flexDirection: 'row',
     justifyContent: 'center',
     marginLeft: -240,
     marginTop: 20,
     height: 30,
  },

  checkFont: {
    fontSize: 20,
    height: 30,
    marginTop: 2,
  },

  credits: {

    marginTop: 10,
    marginLeft: 312,
    fontSize: 20,
    backgroundColor: 'rgba(170,220,156,2)',
    borderColor: 'rgba(0,0,0,1)',
    borderWidth: 2.0,
  }

});