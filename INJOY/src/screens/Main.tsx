import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/PostSlice';
import Three from '../assets/Svgs/More';
import More from '../assets/Svgs/More';
import Like from '../assets/Svgs/Like';
import Commit from '../assets/Svgs/Commit';
import Kayd from '../assets/Svgs/Kayd';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const Main = () => {
  const dispatch: any = useDispatch();
  const posts = useSelector((state: any) => state.AllPost.data);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const renderPost = ({ item }: any) => (
    <View style={{ gap: 10, marginBottom: screenHeight / 20, borderTopColor: "gray", borderWidth: 1, borderBottomWidth: 0 }}>
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

        <View style={{ marginTop: 20,marginEnd:screenWidth/14 }}>
          <Text style={styles.postTitle}>{item.title}</Text>
        </View>
      </View>
      <View style={styles.postContainer}>
        <Image
          source={{ uri: item?.image }}
          style={styles.postImage}
        />
      </View>
      <View style={{ flexDirection: "row", gap: screenWidth / 10, left: screenWidth / 12 }}>
        <View style={{ flexDirection: "row", gap: screenWidth / 10 }}>
          <View style={{ flexDirection: "row", gap: screenWidth / 40 }}>
            <Like />
            <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
              10
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: screenWidth / 40 }}>
            <Commit />
            <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
              10
            </Text>
          </View>
        </View>
        <View > 
              <Kayd/>
        </View>   
         </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={{ padding: 60 }}>
      </View>
      <FlatList
        data={posts}
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
