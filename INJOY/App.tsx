import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './src/screens/StackScreens';


const App = () => {
  // useEffect(() => {
  //     SplashScreen.hide()
  // },[])
  
  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>
  );
};

export default App;
