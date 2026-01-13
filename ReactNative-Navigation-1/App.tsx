import { NavigationContainer } from '@react-navigation/native'
import MainStack from './src/navigation/MainStack';
import React from 'react'

const App = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer >
  );
};

export default App;