import React from 'react';
import {View} from 'react-native';

import Navigator from './src/navigation/Navigator'
import Reducer from './src/context/Reducer'
import {StateProvider} from './src/context/Context';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StateProvider reducer={Reducer}>
        <Navigator />
      </StateProvider>
    </View>
  );
};

export default App;
