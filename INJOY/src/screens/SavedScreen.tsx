import { View, Text,TouchableOpacity,Image ,StyleSheet,FlatList,Dimensions} from 'react-native'
import React, { useState ,useEffect} from 'react'
import Backk from '../assets/Svgs/Backk'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const SavedScreen = ({navigation}:any) => {
  const [data, setdata] = useState<any>()
  const [filteredPosts, setfilteredPosts] = useState('')
  useEffect(() => {
    if (data) {
      const filteredPosts = data.filter((data: any) => data.image);
      setfilteredPosts(filteredPosts)
    }
  }, [data]);
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
const renderPost = ({ item }: any) => (
    
  <View >
    <Image
      source={{ uri: item.image }}
      style={styles.imagee}
      resizeMode="cover"
    />
  </View>
)

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
            <View >
          <FlatList
            style={{width:screenWidth}}
            data={filteredPosts}
            renderItem={renderPost}
            keyExtractor={(item: any) => item._id}
            numColumns={3}
          />
        </View>
    </View>
  )
}

export default SavedScreen

const styles = StyleSheet.create({

  imagee: {
    width: screenWidth/3,
    height: 100,

  },
})