import React, {useEffect} from 'react';
import {View} from 'react-native';

import Reducer from './src/context/Reducer'
import {StateProvider} from './src/context/Context'
import AppContainer from './src/components/AppContainer'

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StateProvider reducer={Reducer}>
        <AppContainer />
      </StateProvider>
    </View>
  );
};

export default App;
