import { View, Text, FlatList, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikes } from '../redux/slices/Like';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Like from '../assets/Svgs/Like';
const Liked = () => {
    const dispatch: any = useDispatch();
    const likes = useSelector((state: any) => state.AllLikes.data);
    const [userr, setuserr] = useState<any>()
    const [data, setdata] = useState<any>()


    useFocusEffect(
        React.useCallback(() => {

            const fetchUserData = async () => {
                await dispatch(fetchLikes())
                const userData: any = await AsyncStorage.getItem('user');
                const userr = await JSON.parse(userData);
                setuserr(userr);
                console.log(userr._id);

                const filtered = await likes.filter((item: any) => item.auth._id == userr._id);
                setdata(filtered)
            }
            fetchUserData()
        }, [data,fetchLikes])

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
                         <Text style={{ color: "#0677E8", fontSize: 16 }}>
                                {item.user.FullName}
                            </Text>

                            {
                                item?.post?.image ? <Text style={{ color: "white", fontSize: 16 }}>
                                    liked your post
                                </Text>
                                    :
                                    <Text style={{ color: "white", fontSize: 16 }}>
                                        liked your status
                                    </Text>

                            }
                         </View>

                           <View>
                           {
                                item?.post?.image ?
                                    <Image
                                        source={{ uri: item?.post?.image }}
                                        style={{ width: 25, height: 25}}
                                    /> :
                                    null
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