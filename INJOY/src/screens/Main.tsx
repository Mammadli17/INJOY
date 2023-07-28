import { View, Text, SafeAreaView, Button } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { signout } from '../redux/slices/loginSliceC';
import Home from '../assets/Svgs/Home';

const Main = ({navigation}:any) => {

  let dispatch = useDispatch();

  const signoutApp = () => {
    AsyncStorage.removeItem("token")
      .then(res => {
        dispatch(signout())
        navigation.navigate("CheckToken")
  })
}
return (
  <View style={{backgroundColor:'#131621',flex:1}}>
        <Button title='cix ' onPress={signoutApp}/>
  </View>
)
}

export default Main