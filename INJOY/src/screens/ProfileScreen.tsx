import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator, Modal, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/slices/UserSlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from "axios";
import { AppDispatch } from '../redux';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProfileScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, error, loading } = useSelector((state: any) => state.User);
  console.log("dattt", data);

  useEffect(() => {
    dispatch(fetchUser({ _id: '64c4131e87e34c429e2e8048' }));
  }, []);

  const [newImage, setNewImage] = useState<any>(null);
  const [loadingImageUpload, setLoadingImageUpload] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImageSelect = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response) => {
        if (!response.didCancel) {
          setNewImage(response);
          setModalVisible(true); // Show the modal after selecting the image
        }
      }
    );
  };

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
    formData.append('userId', "64c4131e87e34c429e2e8048");

    axios
      .post('http://192.168.100.27:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        console.log('Upload successful!');
        dispatch(fetchUser({ _id: '64c4131e87e34c429e2e8048' }));
      })
      .catch((error) => {
        console.log('Upload error:', error);
      })
      .finally(() => {
        setLoadingImageUpload(false); // Set loading state back to false regardless of success or failure
        setModalVisible(false); // Close the modal after the image upload
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pictures/onbording3.png')}
        style={{ width: screenWidth, height: screenHeight / 4 }}
      />

      <View style={styles.imageContainer}>
        {data?.profilepicture ? (
          <TouchableOpacity onPress={handleImageSelect}>
            <Image
              source={{ uri: data?.profilepicture }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <Image
            source={require('../assets/pictures/profile.jpg')}
            resizeMode="cover"
            style={styles.image}
          />
        )}
      </View>

      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
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
            <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Vazgeç</Text>
            </Pressable>

            <Pressable style={styles.modalButton} onPress={handleImageUpload}>
              <Text style={styles.modalButtonText}>Resmi Yükle</Text>
            </Pressable>
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
  },
  modalButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 8,
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
