import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import OnBoarding from './OnBoarding';
import Register from './Register';
import CheckOnbording from './CheckOnbording';
import Otp from './Otp';
import TabScreen from './TabScreen';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator>
     <Stack.Screen name="CheckOnbording" component={CheckOnbording} options={{ headerShown: false }} />
      <Stack.Screen name="OnBoard" component={OnBoarding} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
      <Stack.Screen name="Tab" component={TabScreen} options={{ headerShown: false }} />
      

    </Stack.Navigator>
  );
};

export default StackNav;
