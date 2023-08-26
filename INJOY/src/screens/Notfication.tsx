import { View, Text, SafeAreaView, Button,TouchableOpacity } from 'react-native'
import React from 'react'
import Like from '../assets/Svgs/Like';
import Commit from '../assets/Svgs/Commit';
import Connect from '../assets/Svgs/Connect';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Liked from './Liked';
import Connection from './Connection';
import CommentNotf from './CommentNotf';
import Backk from '../assets/Svgs/Backk';

const Tab = createMaterialTopTabNavigator();
const Notfication = ({ navigation }: any) => {

  return (
   <View style={{flex:1, backgroundColor: '#131621'}}>
       <View style={{ marginTop: 20, left: 10, flexDirection: "row", gap: 20, alignItems: "center"}}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Backk />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, color: "white" }}>
          Notifications
        </Text>
      </View>
     <View style={{ backgroundColor:'#131621',top:20,flex:1 }}>
      <Tab.Navigator
       screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: '#131620',
          marginHorizontal:10,
          overflow:"scroll",         
        },
        tabBarIcon: ({ color, focused }) => {
          let iconComponent;
          if (route.name === 'Liked') {         
            iconComponent = <Like  fill={focused ? '#0677E8' : "white"} />;
          } else if (route.name === 'CommentNotf') {
            iconComponent = <Commit  fill={focused ? '#0677E8' : "white"} />;
          } else if (route.name === 'Connection') {
            iconComponent = <Connect fill={focused ? '#0677E8' : "white"} />;
          }
          return iconComponent;
        },
        headerShown: false,  
      })}
      >
        <Tab.Screen name="Liked" component={Liked} />
        <Tab.Screen name="CommentNotf" component={CommentNotf} />
        <Tab.Screen name="Connection" component={Connection} />
      </Tab.Navigator>
    </View>
   </View>
  )
}

export default Notfication