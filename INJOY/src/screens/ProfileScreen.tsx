import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator, Modal, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/slices/UserSlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from "axios";
import { AppDispatch } from '../redux';
import Cancel from '../assets/Svgs/Cancel';
import Done from '../assets/Svgs/Done';
import Edit from '../assets/Svgs/Edit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProfileScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, error, loading } = useSelector((state: any) => state.User);
  console.log("dattt", data);

  const [newImage, setNewImage] = useState<any>(null);
  const [loadingImageUpload, setLoadingImageUpload] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [user, setuser] = useState<any>()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const userr = JSON.parse(userData);
          setuser(userr); // You can directly call setuser here.
          dispatch(fetchUser({ _id: userr._id })); // Use userr._id here instead of user._id
          console.log(userr._id);
        } 
      } catch (error) {
        console.log('Error retrieving user data from AsyncStorage:', error);
      }
    };
  
    fetchUserData();
  }, []);


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
const modal =()=>{
  setModalVisible1(true)
}
  const handleImageUpload = () => {
    if (!newImage || !newImage.assets || newImage.assets.length === 0) {
      return;
    }

    setLoadingImageUpload(true); // Set loading state to true

    const formData = new FormData();
    formData.append('profileImg', {
      uri: newImage.assets[0].uri,
      name: newImage.assets[0].fileName,
      type: newImage.assets[0].type,
    });
    formData.append('userId', user._id);

    axios
      .post('http://192.168.100.27:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        console.log('Upload successful!');
        dispatch(fetchUser({ _id: user._id }));
      })
      .catch((error) => {
        console.log('Upload error:', error);
      })
      .finally(() => {
        setLoadingImageUpload(false);
        setModalVisible(false); 
      });
      setModalVisible1(false)
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pictures/background.png')}
        style={{ width: screenWidth, height: screenHeight / 4 }}
      />

      <View style={styles.imageContainer}>
        {data?.profilepicture ? (
          <TouchableOpacity onPress={modal}>
            <Image
              source={{ uri: data?.profilepicture }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
    
          <TouchableOpacity onPress={modal}>
            <Image
            source={require('../assets/pictures/profile.jpg')}
            resizeMode="cover"
            style={styles.image}
          />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        animationType="fade"
        visible={modalVisible1}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {data?.profilepicture && (
            <Image
              source={{ uri: data.profilepicture }}
              style={styles.selectedImage}
              resizeMode="cover"
            />
          )}

          <View style={styles.modalButtons}>

            <Pressable  onPress={handleImageSelect}>
              <Edit/>
            </Pressable>
            <TouchableOpacity onPress={() => setModalVisible1(false)}>
              <Cancel/>
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
        <View style={styles.modalContainer}>
          {newImage && (
            <Image
              source={{ uri: newImage.assets[0].uri }}
              style={styles.selectedImage}
              resizeMode="cover"
            />
          )}

          <View style={styles.modalButtons}>
            <View style={{flexDirection:"row",left:"6%"}}>
            <Pressable style={{right:"100%",marginTop:"1%"}} onPress={() => setModalVisible(false)}>
              <Cancel/>
            </Pressable>

            <Pressable onPress={handleImageUpload}>
              <Done/>
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
    gap:50,
 
  },
  modalButton: {
    backgroundColor: '#0677E8',
    padding: 10,
    borderRadius: 8,
    right:"100%"
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#33FF57',
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProfileScreen;
