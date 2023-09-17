import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Sent from '../assets/Svgs/Sent';
import Call from '../assets/Svgs/Call';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats } from '../redux/slices/Chats';

const ChatByUser = ({ route }: any) => {
  const User = route?.params?.item;
  console.log(User);
  const [message, setmessage] = useState<any>()
  const [user, setuser] = useState<any>()
  const Chats: any = useSelector((state: any) => state.AllChats.data);
  console.log(message, "mees");
  const dispatch: any = useDispatch();
  useEffect(() => {


    const fetchUserData = async () => {

      const userData: any = await AsyncStorage.getItem('user');
      const userr = await JSON.parse(userData);
      setuser(userr);
      dispatch(fetchChats());

    };

    fetchUserData();
  }, []);
  console.log(Chats);


  const Send = () => {
    const a = {
      "sender": user._id,
      "receiver": User._id,
      "content": message
    }
    axios.post("http://192.168.1.88:8080/api/user/chatpost", a)
      .then(response => {
        dispatch(fetchChats())
      })
      .catch(error => {
        console.error('Error while liking post:', error);


      });
    setmessage("")
  }


  const render = ({ item }: any) => {

    const createdAt = new Date(item?.createdAt);
    const saat = createdAt.getHours();
    const dakika = createdAt.getMinutes();
  
    return (
      (item.sender === user?._id && item.receiver === User?._id) ||
      (item.sender === User?._id && item.receiver === user?._id) ? (
        item.sender === user?._id ? (
          <View style={{ marginBottom: 20,gap:3}}>
            <View style={{ justifyContent: "flex-end", flexDirection: "row", right: 20 }}>
              <Text style={{ backgroundColor: "#2F6C9F", padding: 10, borderRadius: 10, color: "white" }} >{item.content}</Text>
            </View>
            <View style={{ justifyContent: "flex-end", flexDirection: "row", right: 22, }}>
              <Text style={{fontSize:12,color:"gray"}}>{saat}:{dakika}</Text>
            </View>
          </View>
        ) : (
          <View style={{ marginBottom: 20 ,gap:3}}>
            <View style={{ justifyContent: "flex-start", flexDirection: "row", left: 20,}}>
              <Text style={{ backgroundColor: "#292C35", padding: 10, borderRadius: 10, color: "white" }} >{item.content}</Text>
            </View>
            <View style={{ flexDirection: "row", left: 22 }}>
              <Text style={{fontSize:12,color:"gray"}}>{saat}:{dakika}</Text>
            </View>
          </View>
        )
      ) : null
    );
  };
  

  return (
    <View style={{ backgroundColor: "#131621", flex: 1 }}>
      <View style={{ backgroundColor: "#292C35", height: 80, width: "100%", borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
        <View style={{ left: 20, alignItems: "center", flexDirection: "row", top: 20, gap: 150 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Image
              source={User.profilepicture ? { uri: User.profilepicture } : require('../assets/pictures/profile.jpg')}
              style={{ height: 40, width: 40, borderRadius: 100 }}
              resizeMode="cover"
            />
            <Text style={{ fontSize: 18, color: "white" }}>
              {User.FullName}
            </Text>
          </View>
          <View style={{ backgroundColor: "#494C53", padding: 10, borderRadius: 100 }}>
            <Call />
          </View>
        </View>
      </View>
      <View style={{ top: 30 }}>
        <FlatList
          data={Chats}
          renderItem={render}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={[styles.textInputContainer]}>
          <TextInput
            placeholder="Write now"
            placeholderTextColor={'gray'}
            style={{ width: "100%", height: 40, fontSize: 16 }}
            onChangeText={setmessage}
            value={message}
          />
          <View style={styles.sendContainer}>
            <TouchableOpacity onPress={Send} >
              <Sent />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 8,
    marginHorizontal: 10,
    backgroundColor: "#292C35"
  },
  sendContainer: {
    left: -30
  },
});

export default ChatByUser;
