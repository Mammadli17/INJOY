import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import OnBoarding from './OnBoarding';
import Register from './Register';
import CheckOnbording from './CheckOnbording';
import Otp from './Otp';
import TabScreen from './TabScreen';
import CheckToken from './CheckToken';
import SignIn from './SignIn';
import Comment from './Comment';
import SettingScreen from './SettingScreen';
import SavedScreen from './SavedScreen';
import PostScreen from './PostScreen';
import ProfileUserScreen from './ProfileUserScreen';
import ProfileScreenUser from './ProfileScreenUser';
import Chat from './Chat';
import Story from '../components/Story';
import GPT from './GPT';
import ChatByUser from './ChatByUser';

const Stack = createStackNavigator();

const   StackNav = () => {
  return (
    <Stack.Navigator>
     <Stack.Screen name="CheckOnbording" component={CheckOnbording} options={{ headerShown: false }} />
      <Stack.Screen name="OnBoard" component={OnBoarding} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
      <Stack.Screen name="Tab" component={TabScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CheckToken" component={CheckToken} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Comment" component={Comment} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Saved" component={SavedScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PostScreen" component={PostScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileUserScreen" component={ProfileUserScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileScreenUser" component={ProfileScreenUser} options={{ headerShown: false }} />
      <Stack.Screen name="Story" component={Story} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
      <Stack.Screen name="GPT" component={GPT} options={{ headerShown: false }} />
      <Stack.Screen name="ChatByUser" component={ChatByUser} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackNav;
