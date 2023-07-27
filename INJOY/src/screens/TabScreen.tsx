import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './Main';
import Home from '../assets/Svgs/Home';
import Chat from './Chat';
import Chat1 from '../assets/Svgs/Chat';
import AddPost from './AddPost';
import Post from '../assets/Svgs/Post';
import Notfication from './Notfication';
import Notf from '../assets/Svgs/Notf';
import ProfileScreen from './ProfileScreen';
import ProfileMain from '../assets/Svgs/ProfileMain';

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: '#131620',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconComponent;

          if (route.name === 'Main') {
            iconComponent = <Home size={size} fill={focused ? '#0677E8' : color} />;
          } else if (route.name === 'Chat') {
            iconComponent = <Chat1 size={size} fill={focused ? '#0677E8' : color} />;
          } else if (route.name === 'Post') {
            iconComponent = <Post size={size} fill={focused ? '#0677E8' : color} />;
          } else if (route.name === 'notf') {
            iconComponent = <Notf size={size} fill={focused ? '#0677E8' : color} />;
          } else if (route.name === 'Profile') {
            iconComponent = <ProfileMain size={size} fill={focused ? '#0677E8' : color} />;
          }

          return iconComponent;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Post" component={AddPost} />
      <Tab.Screen name="notf" component={Notfication} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabScreen;
