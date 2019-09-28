import React, { useEffect } from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Reducer from './src/context/Reducer'
import {StateProvider} from './src/context/Context'
import Navigator from './src/navigation/Navigator'

const App = () => {
  useEffect(()=>{
    Icon.loadFont()
  },[])
  return (
    <View style={{flex: 1}}>
      <StateProvider reducer={Reducer}>
        <Navigator />
      </StateProvider>
    </View>
  );
};

export default App;
