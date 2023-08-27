import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/PostSlice';
import Three from '../assets/Svgs/More';
import More from '../assets/Svgs/More';
import Like from '../assets/Svgs/Like';
import Commit from '../assets/Svgs/Commit';
import Kayd from '../assets/Svgs/Kayd';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchLikes } from '../redux/slices/Like';
import { fetchComments } from '../redux/slices/Comment';
import Story from '../components/Story';
import Chat1 from '../assets/Svgs/Chat';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const Main = ({ navigation }: any) => {
  const dispatch: any = useDispatch();
  const posts = useSelector((state: any) => state.AllPost.data);
  const reversedData = [...posts].reverse();
  const likes = useSelector((state: any) => state.AllLikes.data);
  const comments = useSelector((state: any) => state.AllComment.data);
  const [userr, setuserr] = useState<any>()
  const [saved, setsaved] = useState<any>()
  const [ReversedData, setReversedData] = useState('')
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchComments());

    const fetchUserData = async () => {
      dispatch(fetchLikes());
      dispatch(fetchComments());
      const userData: any = await AsyncStorage.getItem('user');
      const userr = await JSON.parse(userData);
      setuserr(userr);

      // Kaydedilen postları AsyncStorage'den al ve uygun renkleri ayarla

    };

    fetchUserData();
  }, [dispatch]);


  useFocusEffect(
    React.useCallback(() => {

      const fetchUserData = async () => {
        dispatch(fetchPosts())
        dispatch(fetchLikes())
        dispatch(fetchComments())
        const savedItems: any = await AsyncStorage.getItem('Saved');
        const sav = await JSON.parse(savedItems);
        setsaved(sav)
        const userData: any = await AsyncStorage.getItem('user');
        const userr = await JSON.parse(userData);

        setuserr(userr)
      }
      fetchUserData()
    }, [])

  );

  const SavedFunc = async (item: any) => {
    try {
      const Saved: any = await AsyncStorage.getItem('Saved');
      let savedItems = await Saved ? JSON.parse(Saved) : [];

      const isItemSaved = savedItems.some((savedItem: any) => savedItem._id === item._id);
      if (isItemSaved) {
        savedItems = await savedItems.filter((savedItem: any) => savedItem._id !== item._id);
      } else {
        savedItems = [item, ...savedItems];
      }

      await AsyncStorage.setItem('Saved', JSON.stringify(savedItems));
      setsaved(savedItems)

    } catch (error) {
      console.error('Error while handling saved items:', error);
    }
  };


  const LikeFunc = async (item: any) => {
    try {


      const likeData = {
        userId: userr?._id,
        postId: item._id,
        authId: item.user._id
      }

      axios.post("http://192.168.100.31:8080/api/user/postLike", likeData)
        .then(response => {

          dispatch(fetchLikes())
        })
        .catch(error => {
          console.error('Error while liking post:', error);


        });



    } catch (error) {

    }
  }
  const Func = (item: any) => {
    if (item.user._id === userr?._id) {
      navigation.navigate("Profile")
    } else {
      navigation.navigate("ProfileUserScreen", { item })
    }
  }

  const renderPost = ({ item }: any) => {
    const postLikes = likes?.filter((like: any) => like.post._id === item._id) || [];
    const postComment = comments?.filter((com: any) => com.post._id === item._id) || [];
    const isLiked = postLikes?.filter((color: any) => color.user._id === userr?._id) || [];
    const isLike = isLiked.length > 0;

    const color = saved?.filter((saved: any) => saved._id === item._id) || [];
    return (
      <>
        {
          item.image ?
            <View style={{ gap: 10, marginBottom: screenHeight / 20, borderTopColor: "gray", borderWidth: 1, borderBottomWidth: 0 }}>
              <TouchableOpacity onPress={() => Func(item)}>
                <View >
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', left: screenWidth / 12 }}>
                      <View style={{}}>
                        {item?.user?.profilepicture ? (

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
                      <View style={{ left: screenWidth / 20, justifyContent: "center" }}>
                        <Text style={{ fontSize: 18, color: "white" }}>
                          {item.user?.FullName}
                        </Text>
                        <Text style={{ fontSize: 14, color: "gray" }}>
                        {new Date(item.Date).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <More />
                    </View>
                  </View>

                  <View style={{ marginTop: 20, marginEnd: screenWidth / 14 }}>
                    <Text style={styles.postTitle}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.postContainer}>
                <Image
                  source={{ uri: item?.image }}
                  style={styles.postImage}
                />
              </View>
              <View style={{ flexDirection: "row", gap: screenWidth / 10, left: screenWidth / 12 }}>
                <View style={{ flexDirection: "row", gap: screenWidth / 10 }}>
                  <View style={{ flexDirection: "row", gap: screenWidth / 40 }}>
                    <TouchableOpacity onPress={() => LikeFunc(item)}>
                      <Like fill={isLike ? "#0677E8" : "white"} />
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
                      {postLikes.length ? postLikes.length : "  "}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: screenWidth / 40 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Comment", { item })}>
                      <Commit />
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
                      {postComment.length ? postComment.length : "  "}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => SavedFunc(item)}>
                  <View >
                    <Kayd fill={color.length ? "#0677E8" : null} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            : <View style={{ gap: 10, marginBottom: screenHeight / 20, borderTopColor: "gray", borderWidth: 1, borderBottomWidth: 0 }}>
              <TouchableOpacity onPress={() => Func(item)}>


                <View >
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', left: screenWidth / 12 }}>
                      <View style={{}}>
                        {item?.user?.profilepicture ? (

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
                      <View style={{ left: screenWidth / 20, justifyContent: "center" }}>
                        <Text style={{ fontSize: 18, color: "white" }}>
                          {item.user?.FullName}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <More />
                    </View>
                  </View>

                  <View style={{ marginTop: 20, marginEnd: screenWidth / 14 }}>
                    <Text style={styles.postTitle}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", gap: screenWidth / 10, left: screenWidth / 12 }}>
                <View style={{ flexDirection: "row", gap: screenWidth / 10 }}>
                  <View style={{ flexDirection: "row", gap: screenWidth / 40 }}>
                    <TouchableOpacity onPress={() => LikeFunc(item)}>
                      <Like fill={isLike ? "#0677E8" : "white"} />
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
                      {postLikes.length ? postLikes.length : "  "}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: screenWidth / 40 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Comment", { item })}>
                      <Commit />
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
                      {postComment.length ? postComment.length : "  "}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => SavedFunc(item)}>
                  <View >
                    <Kayd fill={color.length ? "#0677E8" : null} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
        }
      </>
    )
  };
  return (
    <View style={styles.container}>
      <View style={{ }}>
     <View style={{flexDirection:"row",justifyContent:"space-between",top:5}}>
     <View style={{left:10}}>
          <Text style={{fontSize:25}}>
          INJOY
          </Text>
        
        </View>
        <View style={{right:10}}>
        <TouchableOpacity onPress={()=>navigation.navigate("Chat")}>
        <Chat1/>
        </TouchableOpacity>
        </View>
     </View>
        <Story/>
      </View>
      <FlatList
        data={reversedData}
        renderItem={renderPost}
        keyExtractor={(item: any) => item._id}
      />
    </View>
  );
}
export default Main;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131621',
    flex: 1,
  },
  postContainer: {
    alignItems: 'center',
    height: screenHeight / 3,
    width: screenWidth,
  },
  postImage: {
    width: screenWidth - screenWidth / 6,
    height: screenHeight / 3,
    borderRadius: 20
  },
  postTitle: {
    color: 'white',
    fontSize: 16,
    left: screenWidth / 12
  }, image: {
    width: screenWidth / 10,
    height: screenWidth / 10,
    borderRadius: 300,
  },
});
