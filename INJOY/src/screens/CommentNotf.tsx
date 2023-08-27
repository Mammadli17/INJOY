import { View, Text, FlatList, Image, ScrollView } from 'react-native'
import React, { useState , useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikes } from '../redux/slices/Like';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchComments } from '../redux/slices/Comment';
const Liked = () => {
    const dispatch: any = useDispatch();
    const likes = useSelector((state: any) => state.AllComment.data);
    const [userr, setuserr] = useState<any>()
    const [data, setdata] = useState<any>()   

   

  useFocusEffect(
      React.useCallback(() => {
        const fetchUserData = async () => {
          await dispatch(fetchComments());
          const userData :any = await AsyncStorage.getItem('user');
          const userr :any = JSON.parse(userData );
          setuserr(userr);
    
          const filtered = likes.filter((item:any) => item.auth._id === userr._id);
          setdata(filtered);
      };
          fetchUserData();
      }, [data,fetchComments])
  );
    const renderUser = ({ item }: any) => {
        return (
            <View style={{ left: 10 }}>
                <ScrollView>
                    <View style={{ flexDirection: "row", gap: 20, marginBottom: 30, alignItems: "center" }}>
                        <Image
                            source={item.user.profilepicture ? { uri: item.user.profilepicture } : require('../assets/pictures/profile.jpg')}
                            style={{ height: 50, width: 50, borderRadius: 100 }}
                            resizeMode="cover"
                        />
                        <View style={{ flexDirection:"row",justifyContent:"space-between",gap:30 }}>
                         <View style={{ flexDirection: "row", gap: 10, alignItems: "center"}}>
                         

                            {
                                item?.post?.image ? 
                                <View>
                                  <Text style={{ color: "white", fontSize: 16}}>
                                    {item.user.FullName}  commented your post : 
                                </Text>
                                <Text style={{ color: "white", fontSize: 16}}>
                                  {item.message}
                                </Text>
                                </View>
                                    :
                                    <View>
                                    <Text style={{ color: "white", fontSize: 16}}>
                                      {item.user.FullName}  commented your status : 
                                  </Text>
                                  <Text style={{ color: "white", fontSize: 16}}>
                                    {item.message}
                                  </Text>
                                  </View>

                            }
                         </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#131621'}}>

            <View style={{top:20}}>
                <FlatList
                    data={data}
                    renderItem={renderUser}
                />
            </View>
        </View>
    )
}

export default Liked