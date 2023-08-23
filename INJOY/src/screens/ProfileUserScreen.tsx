import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/slices/UserSlice';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '../redux';
import { fetchUserPost } from '../redux/slices/UserPost';
import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProfileScreen = ({ navigation,route }: any) => {
  const { item } = route.params;    
  const dispatch: AppDispatch = useDispatch();
  const [filteredPosts, setfilteredPosts] = useState([])
  const posts = useSelector((state: any) => state.UserPost.data);
  
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const userData = await AsyncStorage.getItem('user');
          if (userData) {
            await dispatch(fetchUser({ _id: item.user._id }));
            await dispatch(fetchUserPost({ id:item.user._id }));
          }
        } catch (error) {
        }
      };

      fetchUserData();
    }, [])
  );

  useEffect(() => {
    if (posts) {
      const filteredPosts = posts.filter((post: any) => post.image);
      setfilteredPosts(filteredPosts)
    }
  }, [posts]);  
  const renderPost = ({ item }: any) => (

    <View >
      <TouchableOpacity onPress={() => navigation.navigate("PostScreen", { item })}>
        <Image
          source={{ uri: item.image }}
          style={styles.imagee}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  )
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pictures/background.png')}
        style={{ width: screenWidth, height: screenHeight / 4 }}
      />
     
      <View style={styles.imageContainer}>
        {item?.user.profilepicture ? (
         
            <Image
              source={{ uri: item?.user.profilepicture }}
              style={styles.image}
              resizeMode="cover"
            />
        ) : (
          
            <Image
              source={require('../assets/pictures/profile.jpg')}
              resizeMode="cover"
              style={styles.image}
            />
      
        )}
      </View>

      <View style={{ marginTop: '16%' }}>
        <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>
          {item?.user.FullName}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: "gray", marginBottom:10,top:10}}>
         { item.user?.bio ? item.user.bio : "Hey I am using INJOY!" }
          </Text>
        </View>
      </View>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: "white" }}>Posts</Text>
            <Text style={{ fontSize: 20, color: "white" }}>{filteredPosts ? filteredPosts.length : 0}</Text>
          </View>
          <View style={{ alignItems: "center", left: screenWidth * 0.04 }}>
            <Text style={{ fontSize: 20, color: "white" }}>Followers</Text>
            <Text style={{ fontSize: 20, color: "white" }}>19</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: "white" }}>Following</Text>
            <Text style={{ fontSize: 20, color: "white" }}>19</Text>
          </View>
        </View>
        <View style={{ backgroundColor: "gray", width: screenWidth, height: 2, marginTop: screenHeight / 30 }}>
        </View>
        <View >
          <FlatList
            style={{ height: screenHeight / 2.5 }}
            data={filteredPosts}
            renderItem={renderPost}
            keyExtractor={(item: any) => item._id}
            numColumns={3}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131621',
    flex: 1,
  },
  imageContainer: {
    padding: 10,
    borderWidth: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: screenHeight / 6,
    left: screenWidth / 3,
    borderRadius: 100,
    borderColor: '#131621',
    backgroundColor: '#131621',
  },
  image: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    borderRadius: 300,
  }, imagee: {
    width: screenWidth / 3,
    height: screenWidth / 3,

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  selectedImage: {
    width: screenWidth / 2,
    height: screenWidth / 2,
    borderRadius: 300,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 50,
  },
});

export default ProfileScreen;
