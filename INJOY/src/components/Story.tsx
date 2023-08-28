import { View, Text, Dimensions, Image, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector,shallowEqual } from 'react-redux';
import { AppDispatch } from '../redux';
import { useFocusEffect } from '@react-navigation/native';
import { fetchUsers } from '../redux/slices/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from '../assets/Svgs/Post';
import Storyy from '../assets/Svgs/Story';
import Cancel from '../assets/Svgs/Cancel';
import StoryCancel from '../assets/Svgs/StoryCancel';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Done from '../assets/Svgs/Done';
import axios from 'axios';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const Story = ({ navigation }: any) => {
    const [newImage, setNewImage] = useState<any>(null);
    const [userr, setuserr] = useState<any>()
    const [user, setuser] = useState<any>()
    const [ModalVisible, setModalVisible] = useState<any>(false)
    const [ModalVisible1, setModalVisible1] = useState<any>(false)
    const data = useSelector((state: any) => state.AllUsers.data, shallowEqual);

  const dispatch: AppDispatch = useDispatch();

  const [dataFetched, setDataFetched] = useState(false); 

  useEffect(() => {
    dispatch(fetchUsers())
      .then(() => {
        setDataFetched(true); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    
    fetchUserData();
  }, [dispatch]);

  useEffect(() => {
    if (dataFetched && data.length > 0) {
      const filteredFollower = data.find((itemm: any) => itemm._id === userr._id);
      setuser(filteredFollower);
    }
  }, [data, dataFetched, userr]);
  useEffect(() => {
    dispatch(fetchUsers());
    fetchUserData();
  }, [dispatch,]);

  const fetchUserData = async () => {
    const userData: any = await AsyncStorage.getItem('user');
    const userr = JSON.parse(userData);
    setuserr(userr);

    const filteredFollower = data.find((itemm: any) => itemm._id === userr._id);
    console.log(filteredFollower);
    
    setuser(filteredFollower);
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchUsers());
      fetchUserData();
    }, [dispatch])
  );
            
    const handleImageSelect = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
            },
            (response) => {
                if (!response.didCancel) {
                    setNewImage(response);
                    setModalVisible1(true);
                    setModalVisible(false);
                }
            }
        );
    };
    console.log(user,"us");
    
    const handleImageUpload = () => {

        if (!newImage || !newImage.assets || newImage.assets.length === 0) {
          return;
        }  
       console.log(newImage);
       
          
        const formData = new FormData();
        formData.append('story', {
          uri: newImage.assets[0].uri,
          name: newImage.assets[0].fileName,
          type: newImage.assets[0].type,
        });
        formData.append('userId', userr._id);
    
        axios
          .post('http://192.168.100.31:8080/api/story', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            console.log('Upload successful!');
          })
          .catch((error) => {
            console.log("ssssssssssssssssssssssss");
            
          })
          .finally(() => {
    
         
          });
 
      };


    return (
        <View style={{ height: screenHeight * 0.14, top: 10, flexDirection: "row" }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={{ top: 5, left: 10 }}>

                    <Image
                        source={user && user && user.profilepicture ? { uri: user.profilepicture } : require('../assets/pictures/profile.jpg')}
                        style={{ height: 70, width: 70, borderRadius: 100 }}
                        resizeMode="cover"
                    />
                    <View style={{ position: "absolute", top: 50, left: 50 }}>
                        <Storyy />
                    </View>
                    <Text style={{ color: "white", fontSize: 12, alignItems: "center", left: 5, top: 3 }}>
                        Your Story
                    </Text>

                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={ModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{ width: '100%', height: screenWidth * 0.3, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#292C35' }}>
                        <View style={{ justifyContent: "flex-end", flexDirection: "row", right: 10, top: 5 }}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <StoryCancel />
                            </TouchableOpacity>
                        </View>
                        <View style={{ gap: 20, left: 20 }}>
                            <TouchableOpacity onPress={handleImageSelect}>
                                <Text style={{ color: "white", fontSize: 20 }}>
                                    Add your story
                                </Text>
                            </TouchableOpacity>
                            <Text style={{ color: "white", fontSize: 20 }}>
                                View your story
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                visible={ModalVisible1}
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
                        <View style={{ flexDirection: 'row', left: '6%' }}>
                            <Pressable style={{ right: '100%', marginTop: '1%' }} onPress={() => setModalVisible1(false)}>
                                <Cancel />
                            </Pressable>
                            <Pressable  onPress={handleImageUpload}>
                                <Done />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}


export default Story
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
