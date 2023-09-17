import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Galery from '../assets/Svgs/Galery';
import Camera from '../assets/Svgs/Camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Publish from '../assets/Svgs/Publish';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AddPost = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setimage] = useState<any>('')
  const [user, setuser] = useState<any>()
  useEffect(() => {
    const fetchUserData = async () => {


      try {
        const userData: any = await AsyncStorage.getItem('user');

        const userr = JSON.parse(userData);
        setuser(userr);

      } catch (error) {
        console.log('Error retrieving user data from AsyncStorage:', error);
      }
    };

    fetchUserData();

  }, [])
  const handleImageSelectCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
      },
      (response: any) => {
        if (!response.didCancel) {
          setimage(response.assets[0])
          console.log(image);


        }
      }
    );
  };

  const handleImageSelect = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response: any) => {
        if (!response.didCancel) {
          setimage(response.assets[0])
          console.log(image);


        }
      }
    );
  };
  const discard = () => {
    setimage("")
    setTitle('')
  }

  const handleImageUpload = () => {
    console.log(user._id,"id");
    
    if (!image || image.length === 0) {
      
      
      const formData = new FormData();
      formData.append('_id', user._id);
      formData.append('title', title);
      axios.post('https://injoybackend.onrender.com/api/s', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
  
          console.log('Başarılı cevap:', response.data);
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
          }, 1000);
          
        })
        .catch(error => {
          // İstek başarısız oldu veya sunucu hata döndürdü.
          console.error('Response data:', error.response?.data);        });
    }
    else{
      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
      });
    
      formData.append('_id', user._id);
      
      formData.append('title', title);
      axios.post('https://injoybackend.onrender.com/api/s', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          // İstek başarılı oldu ve sunucudan bir cevap döndü.
          console.log('Başarılı cevap:', response.data);
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
          }, 1000);
        })
        .catch(error => {
          // İstek başarısız oldu veya sunucu hata döndürdü.
          console.error('Hata:', error);
        });
  

    }
    setimage("")
    setTitle('')
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: "4%", marginTop: "5%" }}>
        <TouchableOpacity onPress={discard}>
          <Text style={{ color: "#0677E8", fontWeight: "500", fontSize: 18 }}>
            Discard
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 25 }}>
          Create Post
        </Text>
        <TouchableOpacity onPress={handleImageUpload}>
          <Text style={{ color: "#0677E8", fontWeight: "500", fontSize: 18 }}>
            Publish
          </Text>
        </TouchableOpacity>


      </View>
      <View style={{ marginHorizontal: "3%", marginTop: "4%" }}>
        <TextInput
          placeholder="What's on your mind?"
          placeholderTextColor={'gray'}
          style={{ width: screenWidth, height: "40%", fontSize: 20 }}
          onChangeText={setTitle}
          value={title}
        />
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ height: 300, width: 300 }}
              resizeMode="cover"
            />
          )}
        </View>
      </View>
      {image ? (
        <View></View>

      ) : (
        <View style={{ marginTop: screenHeight/4, flexDirection: "row", justifyContent: "space-around", flex: 0.2 }}>
          <TouchableOpacity onPress={handleImageSelect}>
            <Galery />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImageSelectCamera}>
            <Camera />
          </TouchableOpacity>
        </View>

      )}
       {showModal && (
        <View style={styles.modalContainer}>
         <Publish/>
        </View>
      )}
    </View>
  );
};

export default AddPost;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131621',
    flex: 1,
  },  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})