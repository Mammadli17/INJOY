import { View, Text,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Backk from '../assets/Svgs/Backk'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedScreen = ({navigation}:any) => {
  const [data, setdata] = useState<any>()
  useFocusEffect(
    React.useCallback(() => {

        const fetchUserData = async () => {
     
            const savedData: any = await AsyncStorage.getItem('Saved');
            const sav = await JSON.parse(savedData);


            setdata(sav)
        }
        fetchUserData()
    }, [])

);


  return (
    <View style={{flex:1,backgroundColor:"#131621"}}>
      <View style={{marginTop:20,left:10,flexDirection:"row",gap:20,alignItems:"center",marginBottom:30}}>
               <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
               <Backk/>
               </TouchableOpacity>
                <Text style={{fontSize:25,color:"white"}}>
                    Saved Posts
                </Text>
            </View>

    </View>
  )
}

export default SavedScreen