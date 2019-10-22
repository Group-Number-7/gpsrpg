import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Navigator from './src/navigation/Navigator'

const App = () => {
  useEffect(()=>{
    Icon.loadFont()
  },[])
  return (
    <View style={{flex: 1, backgroundColor: "grey"}}>
      <SafeAreaView style={{flex: 1}}>
          <Navigator />
      </SafeAreaView>
    </View>
  );
};

export default App;
