import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './Main';

const Tab = createBottomTabNavigator();
const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={Main} />
    </Tab.Navigator>
  )
}

export default TabScreen