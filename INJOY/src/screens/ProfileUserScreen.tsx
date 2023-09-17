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
import { fetchFollows } from '../redux/slices/Follow';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProfileScreen = ({ navigation,route }: any) => {
  const { item  } = route.params;    
  const dispatch: AppDispatch = useDispatch();
  const [filteredPosts, setfilteredPosts] = useState([])
  const posts = useSelector((state: any) => state.UserPost.data);
  const followerData = useSelector((state: any) => state.AllFollows.data);
  const [user, setUser] = useState<any>();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [Follower, setFollower] = useState<any>();
  const [Following, setFollowing] = useState<any>();

 
 useEffect(() => {
  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const userr = JSON.parse(userData);
        setUser(userr);

        await dispatch(fetchUser({ _id: item.user ? item.user._id : item._id }));
        await dispatch(fetchUserPost({ id: item.user._id }));
        await dispatch(fetchFollows());
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };



  fetchUserData();
}, [dispatch]);
useEffect(() => {
  if (followerData && user) {
    const filteredFollowers = followerData.filter((itemm: any) =>
      itemm.followed?._id === user._id && itemm.follower?._id === item.user._id
    );
    const filteredFollower = followerData.filter((itemm: any) =>
      itemm.followed?._id === user._id
    );
    const filteredFollowing = followerData.filter((itemm: any) =>
    itemm.follower?._id === user._id
  );
    setFollowing(filteredFollowing?.length)
    setIsFollowing(filteredFollowers.length > 0);
    setFollower(filteredFollower?.length)
    
  }
}, [followerData, user]);
const Follow = async () => {
  const apiUrl = 'http://192.168.1.88:8080/api/user/follow';
  const userData: any = await AsyncStorage.getItem('user');
  
  try {
    await axios.post(apiUrl, {
      followed: user._id,
      follower: item.user._id
    });

    await dispatch(fetchFollows());
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
       <View style={{flexDirection:"row",gap:20,top:10,marginBottom:20}}>
        {
            isFollowing ? 
         <TouchableOpacity onPress={Follow} style={{width:80,height:40,borderRadius:15,alignItems:"center",justifyContent:"center",borderColor:"gray",borderWidth:0.5}}>
            <Text style={{color:"white"}}>
                Followed
            </Text>
          </TouchableOpacity>
          :
          
          <TouchableOpacity onPress={Follow} style={{width:80,backgroundColor:"#0C77E9",height:40,borderRadius:15,alignItems:"center",justifyContent:"center"}}>
          <Text style={{color:"white"}}>
              Follow
          </Text>
        </TouchableOpacity>
        }
          <TouchableOpacity  onPress={()=>navigation.navigate("ChatByUser",{item : item.user})}style={{width:80,height:40,borderRadius:15,alignItems:"center",justifyContent:"center",borderColor:"gray",borderWidth:0.5}}>
            <Text style={{color:"white"}}>
                Message
            </Text>
          </TouchableOpacity>
       </View>
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
            <Text style={{ fontSize: 20, color: "white" }}>{Follower}</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: "white" }}>Following</Text>
            <Text style={{ fontSize: 20, color: "white" }}>{Following}</Text>
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
