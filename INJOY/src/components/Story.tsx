import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  Animated,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppDispatch } from '../redux';
import { useFocusEffect } from '@react-navigation/native';
import { fetchUsers } from '../redux/slices/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storyy from '../assets/Svgs/Story';
import Cancel from '../assets/Svgs/Cancel';
import StoryCancel from '../assets/Svgs/StoryCancel';
import { launchImageLibrary } from 'react-native-image-picker';
import Done from '../assets/Svgs/Done';
import axios from 'axios';
import { fetchStory } from '../redux/slices/Story';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Story = ({ navigation }: any) => {
  const [newImage, setNewImage] = useState<any>(null);
  const [userr, setuserr] = useState<any>();
  const [user, setuser] = useState<any>();
  const [ModalVisible, setModalVisible] = useState<any>(false);
  const [ModalVisible1, setModalVisible1] = useState<any>(false);
  const [ModalVisible2, setModalVisible2] = useState<any>(false);
  const [ModalVisible3, setModalVisible3] = useState<any>(false);
  const data1 = useSelector((state: any) => state.AllStory.data, shallowEqual);
  const data = useSelector((state: any) => state.AllUsers.data, shallowEqual);

  const [yourstory, setyourstory] = useState<any>();
  const [BorderColor, setBorderColor] = useState<any>();
  const [story, setstory] = useState<any>();
  const dispatch: AppDispatch = useDispatch();
  const fillAnimation = new Animated.Value(0);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [dataFetched, setDataFetched] = useState(false);
  const slideInAnimation = new Animated.Value(-screenWidth);
  const slideIn = () => {
    Animated.timing(slideInAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideInAnimation, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setModalVisible2(false);
      setModalVisible3(false);
    });
  };

  useEffect(() => {
    if (ModalVisible2 || ModalVisible3) {
      slideIn();
      Animated.timing(fillAnimation, {
        toValue: 1,
        duration: 4000, // Same duration as the modal auto-close
        useNativeDriver: false,
      }).start(() => {
        slideOut();
      });
    } else {
      fillAnimation.setValue(0); // Reset the progress when the modal is closed
    }
  }, [ModalVisible2, ModalVisible3]);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchStory())
      .then(() => {
        setDataFetched(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    fetchUserData();
  }, [dispatch]);

  useEffect(() => {
    if (dataFetched && data.length > 0) {
      const filteredFollower = data.find((itemm: any) => itemm._id === userr._id);

      setuser(filteredFollower);
      const store = data1.filter((itemm: any) => itemm.user._id != userr._id);
      const yours = data1.filter((itemm: any) => itemm.user._id === userr._id);
      const border = yourstory?.find((itemm: any) => itemm.user._id === userr._id);
      const borderColor = border?.users?.find((itemm: any) => itemm === userr._id);
      setBorderColor(borderColor);
      setyourstory(yours);
      setstory(store);
      setuser(filteredFollower);
    }
  }, [data, dataFetched, userr, data1]);

  useEffect(() => {
    dispatch(fetchStory());
    dispatch(fetchUsers());
    fetchUserData();
  }, [dispatch, BorderColor]);

  const fetchUserData = async () => {
    const userData: any = await AsyncStorage.getItem('user');
    const userr = JSON.parse(userData);
    setuserr(userr);

    const yours = data1.filter((itemm: any) => itemm.user._id === userr._id);
    setyourstory(yours);
    console.log(yours);

    const filteredFollower = data.find((itemm: any) => itemm._id === userr._id);
    setuser(filteredFollower);
    const border = yourstory?.find((itemm: any) => itemm.user._id === userr._id);
    const borderColor = border?.users?.find((itemm: any) => itemm === userr._id);
    setBorderColor(borderColor);
    console.log(story, "s");

  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchUsers());
      dispatch(fetchStory());
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
  console.log(BorderColor);

  const Func = async () => {
    setModalVisible2(true);
    await new Promise((resolve) => setTimeout(resolve, 4000));
    setModalVisible(false);
    const a = {
      userId: userr._id,
      storyId: yourstory[0]._id,
    };

    await axios
      .post('https://injoybackend.onrender.com/api/user/userAdd', a)
      .then((response) => {
        console.log(response.data);

      })
      .catch((error) => {
        console.error(error);
      });

    await dispatch(fetchUsers());
    await dispatch(fetchStory());
    fetchUserData();
  };
  const Funcc = async (item: any) => {
    setModalVisible3(true)
    setSelectedItem(item);
    await new Promise((resolve) => setTimeout(resolve, 4000));

    const a = {
      userId: userr._id,
      storyId: item._id,
    };

    await axios
      .post('https://injoybackend.onrender.com/api/user/userAdd', a)
      .then((response) => {
        console.log(response.data);

      })
      .catch((error) => {
        console.error(error);
      });

    await dispatch(fetchUsers());
    await dispatch(fetchStory());
    fetchUserData();


  }

  const render = ({ item }: any) => {
    // Örnek bir filtreleme koşulu: Kullanıcıların yaşları 30'dan büyükse
    const filteredUsers = item.users.filter((item: any) => item === userr._id);
    console.log(item.image);

    return (
      <>
        {item.image ? (
          <View>
            <TouchableOpacity onPress={() => Funcc(item)}>
              <View style={{ marginLeft: 20, alignItems: 'center' }}>
                <Image
                  source={
                    item && item.user && item.user.profilepicture
                      ? { uri: item.user.profilepicture }
                      : require('../assets/pictures/profile.jpg')
                  }
                  style={[{ height: 70, width: 70, borderRadius: 100 }, filteredUsers && filteredUsers.length > 0 ? { borderWidth: 0, borderColor: "#0677E8" } : { borderWidth: 2, borderColor: "#0677E8" }]}
                  resizeMode="cover"
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    alignItems: 'center',
                    top: 3,
                  }}
                >
                  {item.user.FullName}
                </Text>
              </View>
            </TouchableOpacity>
            <Modal
              visible={ModalVisible3}
              onRequestClose={() => setModalVisible3(false)}
            >
              <View style={styles.modalContainer}>
                <Image
                  source={{ uri: selectedItem?.image }}
                  style={{ width: screenWidth, height: screenHeight }}
                  resizeMode="cover"
                />
                <View style={styles.progressContainer}>
                  <Animated.View
                    style={[
                      styles.progressBar,
                      {
                        width: fillAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        }),
                      },
                    ]}
                  />
                </View>
              </View>
            </Modal>
          </View>
        ) : null}
      </>
    );
  };

  console.log(BorderColor);
  const handleImageUpload = async () => {
    if (!newImage || !newImage.assets || newImage.assets.length === 0) {
      return;
    }


    const formData = new FormData();
    formData.append('image', {
      uri: newImage.assets[0].uri,
      name: newImage.assets[0].fileName,
      type: newImage.assets[0].type,
    });
    formData.append('_id', userr._id);

    await axios
      .post('https://injoybackend.onrender.com/api/story', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        console.log('Image uploaded successfully');
        setModalVisible1(false);


      })
      .catch((error) => {
        console.log('Error uploading image:', error);
      });
    await dispatch(fetchUsers());
    await dispatch(fetchStory());
    fetchUserData();

  };


  return (
    <View style={{ height: screenHeight * 0.14, top: 10, flexDirection: 'row' }}>
      <View style={{ top: 5, left: 10, flexDirection: 'row' }}>
        <View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={
                user && user && user.profilepicture
                  ? { uri: user.profilepicture }
                  : require('../assets/pictures/profile.jpg')
              }
              style={[
                { height: 70, width: 70, borderRadius: 100 },
                yourstory && yourstory.length > 0
                  ? BorderColor && BorderColor.length > 0
                    ? null // Eğer 'BorderColor' true ise hiçbir şey eklemeyin
                    : { borderColor: '#0677E8', borderWidth: 2 } // 'BorderColor' false ise sınıra renk ve genişlik ekleyin
                  : null // 'yourstory' boşsa veya uzunluğu 0 ise hiçbir şey eklemeyin
              ]}
              resizeMode="cover"
            />
            <View style={{ position: 'absolute', top: 50, left: 50 }}>
              <Storyy />
            </View>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                alignItems: 'center',
                left: 5,
                top: 3,
              }}
            >
              Your Story
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList data={story} renderItem={render} horizontal />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              width: '100%',
              height: screenWidth * 0.3,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: '#292C35',
            }}
          >
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', right: 10, top: 5 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <StoryCancel />
              </TouchableOpacity>
            </View>
            <View style={{ gap: 20, left: 20 }}>
              <TouchableOpacity onPress={handleImageSelect}>
                <Text style={{ color: 'white', fontSize: 20 }}>Add your story</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={Func}>
                <Text style={{ color: 'white', fontSize: 20 }}>View your story</Text>
              </TouchableOpacity>
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
              <Pressable onPress={handleImageUpload}>
                <Done />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={ModalVisible2} onRequestClose={() => setModalVisible2(false)}>
        <View style={styles.modalContainer}>
          {yourstory && yourstory.length > 0 ? (

            <Image
              source={{ uri: yourstory[0].image }}
              style={{ width: screenWidth / 1.2, height: screenHeight / 1.2, borderRadius: 20 }}
              resizeMode="cover"
            />
          ) : (
            <View>
              <Text style={{ color: 'gray', fontSize: 40 }}>No Status, Please add your status</Text>
            </View>
          )}
          <View style={styles.progressContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: fillAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Story;

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
  imagee: {
    width: screenWidth / 3,
    height: screenWidth / 3,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131621',
  },
  selectedImage: {
    width: screenWidth / 1.5,
    height: screenWidth / 1.2,
    borderRadius: 20,
    marginBottom: 20,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'white',
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
