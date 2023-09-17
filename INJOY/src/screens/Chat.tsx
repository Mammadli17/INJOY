import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Image } from 'react-native';
import Backk from '../assets/Svgs/Backk';
import Search from '../assets/Svgs/Search';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux';
import { fetchUsers } from '../redux/slices/User';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Use } from 'react-native-svg';

const SearchScreen = ({ navigation }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const data = useSelector((state: any) => state.AllUsers.data);
  const [userr, setuserr] = useState<any>()
  const [Users, setUsers] = useState<any>()
  useEffect(() => {

    const fetchUserData = async () => {
      dispatch(fetchUsers())
      const userData: any = await AsyncStorage.getItem('user');
      const userr = await JSON.parse(userData);
      setuserr(userr);
      const dat = data?.filter((item: any) => item._id != userr._id)
      setUsers(dat)


    };

    fetchUserData();
  }, [])



  const renderUser = ({ item }: any) => {
    return (
      <ScrollView>
        <TouchableOpacity onPress={()=>navigation.navigate("ChatByUser",{item})}>
          <View style={{ gap: 20, flexDirection: "row", width: "100%", marginHorizontal: 0, padding: 14 }}>

            <Image
              source={item.profilepicture ? { uri: item.profilepicture } : require('../assets/pictures/profile.jpg')}
              style={{ height: 40, width: 40, borderRadius: 100 }}
              resizeMode="cover"
            />
            <View>
              <Text style={{ color: "white", fontSize: 17 }}>{item?.FullName}</Text>
              <Text style={{ color: "gray", fontSize: 14 }}>
               
              </Text>
            </View>
          </View>

          <View style={{ width: "100%", height: 1, backgroundColor: "gray" }}>

          </View>
        </TouchableOpacity>
      </ScrollView>

    )

  }
  return (
    <View style={{ flex: 1, backgroundColor: "#131621" }}>
      <View style={{ marginTop: 20, left: 10, flexDirection: "row", gap: 20, alignItems: "center", marginBottom: 30 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Backk />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, color: "white" }}>
          Messages
        </Text>
      </View>
      <View style={{ top: 20 }} >
        <TouchableOpacity onPress={() => navigation.navigate("GPT")}>
          <View style={{}}>
            <View style={{ gap: 20, flexDirection: "row", width: "100%", marginHorizontal: 0, padding: 10 }}>
              <Image
                source={
                  require('../assets/pictures/GPTT.jpg')
                }
                style={{ width: 40, height: 40, borderRadius: 100 }}
              />
              <View>
                <Text style={{ color: "white", fontSize: 17 }}>
                  CHAT GPT
                </Text>
                <Text style={{ color: "gray", fontSize: 14 }}>
                  Ask the question to AiChat
                </Text>
              </View>
            </View>
            <View style={{ width: "100%", height: 1, backgroundColor: "gray" }}>

            </View>
          </View>

        </TouchableOpacity>
        <FlatList
          data={Users}
          renderItem={renderUser}
        />
      </View>
    </View>
  );
}

export default SearchScreen;
