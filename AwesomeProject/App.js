import React, { useEffect } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Navigator from './src/navigation/Navigator'

const App = () => {
  useEffect(()=>{
    Icon.loadFont()
  },[])
  return (
    <View style={{flex: 1}}>
        <Navigator />
    </View>
  );
};

export default App;
