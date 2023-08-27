import { View, Text, Dimensions, Image, TouchableOpacity,Modal } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux';
import { useFocusEffect } from '@react-navigation/native';
import { fetchUsers } from '../redux/slices/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from '../assets/Svgs/Post';
import Storyy from '../assets/Svgs/Story';
import Cancel from '../assets/Svgs/Cancel';
import StoryCancel from '../assets/Svgs/StoryCancel';

const Story = ({navigation}:any) => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [userr, setuserr] = useState<any>()
    const data = useSelector((state: any) => state.AllUsers.data);
    const [user, setuser] = useState<any>()
    const [ModalVisible, setModalVisible] = useState<any>(false)
    const dispatch: AppDispatch = useDispatch();
    useFocusEffect(
        React.useCallback(() => {

            const fetchUserData = async () => {
                dispatch(fetchUsers())
                const userData: any = await AsyncStorage.getItem('user');
                const userr = await JSON.parse(userData);
                setuserr(userr);
                const filteredFollower = data.filter((itemm: any) =>
                    itemm._id === userr._id
                );
                setuser(filteredFollower)
            };

            fetchUserData();
        }, [data])

    );


    return (
        <View style={{ height: screenHeight * 0.14, top: 10, flexDirection: "row" }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={{ top: 5, left: 10 }}>

                    <Image
                        source={user && user[0] && user[0].profilepicture ? { uri: user[0].profilepicture } : require('../assets/pictures/profile.jpg')}
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
                        <View style={{justifyContent:"flex-end",flexDirection:"row",right:10,top:5}}>
                           <TouchableOpacity onPress={()=>setModalVisible(false)}>
                           <StoryCancel/>
                           </TouchableOpacity>
                        </View>
                       <View style={{gap:20,left :20}}>
                      <TouchableOpacity onPress={()=>navigation.navigate("AddStory")}>
                      <Text style={{color:"white",fontSize:20}}>
                        Add your story
                       </Text>
                      </TouchableOpacity>
                       <Text style={{color:"white",fontSize:20}}>
                        View your story
                       </Text>
                       </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Story