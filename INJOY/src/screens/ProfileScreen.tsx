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
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/slices/UserSlice';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cancel from '../assets/Svgs/Cancel';
import Done from '../assets/Svgs/Done';
import { AppDispatch } from '../redux';
import Edit from '../assets/Svgs/Edit';
import { fetchUserPost } from '../redux/slices/UserPost';
import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import Settings from '../assets/Svgs/Settings';
import { fetchFollows } from '../redux/slices/Follow';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProfileScreen = ({ navigation }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { data, error, loading } = useSelector((state: any) => state.User);

  const [newImage, setNewImage] = useState<any>(null);
  const [loadingImageUpload, setLoadingImageUpload] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [user, setuser] = useState<any>();
  const [bio, setbio] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [filteredPosts, setfilteredPosts] = useState([])
  const posts = useSelector((state: any) => state.UserPost.data);
  const followerData = useSelector((state: any) => state.AllFollows.data);
  const [Follower, setFollower] = useState<any>();
  const [Following, setFollowing] = useState<any>();


 




  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const userData = await AsyncStorage.getItem('user');
          if (userData) {
            const userr = JSON.parse(userData);
            setuser(userr);
            await dispatch(fetchUser({ _id: userr._id }));
            await dispatch(fetchUserPost({ id: userr._id }));
            await dispatch(fetchFollows());
  
           
          }
        } catch (error) {
        }
      };

      fetchUserData();
    }, [])
  );
  useEffect(() => {
    if (followerData && user) {
      const filteredFollower = followerData.filter((itemm: any) =>
        itemm.followed?._id === user._id
      );
      const filteredFollowing = followerData.filter((itemm: any) =>
      itemm.follower?._id === user._id
    );
      setFollowing(filteredFollowing?.length)
  
      setFollower(filteredFollower?.length)
      
      
    }
  }, [followerData, user]);
  
  
  useEffect(() => {
    if (posts) {
      const filteredPosts = posts.filter((post: any) => post.image);
      setfilteredPosts(filteredPosts)
    }
  }, [posts]);

  const handleBioChange = (text: any) => {
    setbio(text);
    setShowButton(true);
  };

  const handleImageSelect = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response) => {
        if (!response.didCancel) {
          setNewImage(response);
          setModalVisible(true);
          setModalVisible1(false);
        }
      }
    );
  };
  const handleImageUpload = () => {
    if (!newImage || !newImage.assets || newImage.assets.length === 0) {
      return;
    }

    setLoadingImageUpload(true);

    const formData = new FormData();
    formData.append('profileImg', {
      uri: newImage.assets[0].uri,
      name: newImage.assets[0].fileName,
      type: newImage.assets[0].type,
    });
    formData.append('userId', user._id);

    axios
      .post('https://injoybackend.onrender.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        ('Upload successful!');
        dispatch(fetchUser({ _id: user._id }));
      })
      .catch((error) => {
        console.log(error.response.data);
        
      })
      .finally(() => {
        setLoadingImageUpload(false);
        setModalVisible(false);
      });
    setModalVisible1(false);
  };
  const saveBio = () => {
    const apiUrl = 'https://injoybackend.onrender.com/api/user/bio';

    axios
      .post(apiUrl, {
        _id: user._id,
        bio: bio,
      })
      .then((response) => {

        dispatch(fetchUser({ _id: user._id }));

        setShowButton(false);
        setbio('');
        Keyboard.dismiss();
      })
      .catch((error) => {
        console.error('Hata oluştu:', error);
      });
  };
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
      <View style={{ position: 'absolute', right: 20, top: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Settings />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {data?.profilepicture ? (
          <TouchableOpacity onPress={() => setModalVisible1(true)}>
            <Image
              source={{ uri: data?.profilepicture }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setModalVisible1(true)}>
            <Image
              source={require('../assets/pictures/profile.jpg')}
              resizeMode="cover"
              style={styles.image}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={{ marginTop: '16%' }}>
        <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>
          {data?.FullName}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={{ fontSize: 16, color: "gray" }}
            placeholder={data?.bio ? data.bio : "Hey I am using INJOY!"}
            placeholderTextColor={"gray"}
            value={bio}
            onChangeText={handleBioChange}
          />
        </View>
        {showButton && (
          <TouchableOpacity onPress={saveBio}>
            <Text style={{ color: '#0C77E9' }}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: "white" }}>Posts</Text>
            <Text style={{ fontSize: 20, color: "white" }}>{filteredPosts ? filteredPosts.length : 0}</Text>
          </View>
          <View style={{ alignItems: "center", left: screenWidth * 0.04 }}>
            <Text style={{ fontSize: 20, color: "white" }}>Followers</Text>
            <Text style={{ fontSize: 20, color: "white" }}>{Following}</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: "white" }}>Following</Text>
            <Text style={{ fontSize: 20, color: "white" }}>{Follower}</Text>
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


      <Modal
        animationType="fade"
        visible={modalVisible1}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Modal content when clicking on the profile picture */}
        <View style={styles.modalContainer}>
          {data?.profilepicture && (
            <Image
              source={{ uri: data.profilepicture }}
              style={styles.selectedImage}
              resizeMode="cover"
            />
          )}
          <View style={styles.modalButtons}>
            <Pressable onPress={handleImageSelect}>
              <Edit />
            </Pressable>
            <TouchableOpacity onPress={() => setModalVisible1(false)}>
              <Cancel />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible1(false)}
      >
        {/* Modal content when uploading a new profile picture */}
        <View style={styles.modalContainer}>
          {newImage && (
            <Image
              source={{ uri: newImage.assets[0].uri }}
              style={styles.selectedImage}
              resizeMode="cover"
            />
          )}
          <View style={styles.modalButtons}>
            <View style={{ flexDirection: 'row', left: '6%' }}>
              <Pressable style={{ right: '100%', marginTop: '1%' }} onPress={() => setModalVisible(false)}>
                <Cancel />
              </Pressable>
              <Pressable onPress={handleImageUpload}>
                <Done />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131621',
  },
});

export default ProfileScreen;
