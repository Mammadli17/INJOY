import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Image } from 'react-native';
import Backk from '../assets/Svgs/Backk';
import Search from '../assets/Svgs/Search';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux';
import { fetchUsers } from '../redux/slices/User';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({ navigation }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const data = useSelector((state: any) => state.AllUsers.data);
  const [FilteredData, setFilteredData] = useState<any>()
  const [isInputFocused, setInputFocus] = useState<any>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [userr, setuserr] = useState<any>()
  useEffect(() => {
    
    const fetchUserData = async () => {
      dispatch(fetchUsers())
    const userData: any = await AsyncStorage.getItem('user');
    const userr = await JSON.parse(userData);
    setuserr(userr);


    };

    fetchUserData();
  }, [])
  const handleSearch = (text: any): any => {

    const filtered = data.filter((item: any) =>
      item.FullName.toLowerCase().includes(text.toLowerCase()),
    );
    setSearchText(text);
    setFilteredData(filtered);
    console.log(FilteredData);
  };
  const Func = (item :any) =>{
    if(item._id===userr?._id){
      navigation.navigate("Profile")
    }else{
      navigation.navigate("ProfileScreenUser",{item})
    }
}
  const renderUser = ({ item }: any) => {
    return (
      <ScrollView>
       <TouchableOpacity onPress={()=>Func(item)}>
       <View style={{flexDirection:"row",gap:20,marginBottom:30,top:30,left:30,alignItems:"center"}}>
        <Image
          source={item.profilepicture ? { uri: item.profilepicture } : require('../assets/pictures/profile.jpg')}
          style={{ height: 40, width: 40, borderRadius: 100 }}
          resizeMode="cover"
        />
        <Text style={{color:"white",fontSize:16}}>
          {item.FullName}
        </Text>
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
          Search
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={{
            width: screenWidth * 0.88,
            height: screenHeight / 14,
            backgroundColor: "#292C35",
            borderRadius: 12,
            paddingLeft: 20,
            fontSize: 18,
            color: "white",
            paddingRight: 40,
            borderColor: isInputFocused ? '#0677E8' : '#292C35',
            borderWidth: 2,
          }}
          placeholder='Search'
          placeholderTextColor={"white"}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onChangeText={handleSearch}

        />
        <Search
          fill="white"
          style={{

            position: "absolute",
            right: 40,
            width: 20,
            height: 20,

          }}
        />
      </View>
      <View>
        {
          searchText === '' ?

            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", top: 150 }}>
              <Text style={{ color: "#7C7878", fontSize: 50 }}>
                Discover Anything?
              </Text>
            </View>



            :
            <FlatList
              data={FilteredData}
              renderItem={renderUser}
            />
        }
      </View>
    </View>
  );
}

export default SearchScreen;
