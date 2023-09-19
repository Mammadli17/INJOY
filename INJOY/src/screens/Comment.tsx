import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableOpacity, FlatList, Image } from 'react-native';
import Send from '../assets/Svgs/Send';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../redux/slices/Comment';
import Backk from '../assets/Svgs/Backk';

const Comment = ({ route }: any) => {
    const { item } = route.params;
    const [message, setmessage] = useState<any>('')
    const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
    const [user, setuser] = useState<any>()
    const dispatch: any = useDispatch();
    const comments = useSelector((state: any) => state.AllComment.data);
    const commentsbyuser = comments.filter((comment: any) => comment.post._id === item._id);
    const navigation  :any = useNavigation();
    useFocusEffect(
        React.useCallback(() => {

            const fetchUserData = async () => {
                await dispatch(fetchComments())
                const userData: any = await AsyncStorage.getItem('user');
                const userr = await JSON.parse(userData);


                setuser(userr)
            }
            fetchUserData()
        }, [])

    );



    const LikeFunc = async () => {
        try {
            const likeData = {
                userId: user._id,
                postId: item._id,
                authId: item.user._id,
                message: message
            }

            axios.post("http://172.16.0.38:8080/api/user/postComment", likeData)
                .then(response => {
                    
                     dispatch(fetchComments())
                     
                })
                .catch(error => {
                    console.error('Error while liking post:', error);


                });

            setKeyboardIsOpen(false)
            setmessage("")


        } catch (error) {

        }
    }
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsOpen(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsOpen(false);
        });


        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    const renderPost = ({ item }: any) => {
        return (
            <View style={{marginBottom:20}} >
                <View style={{flexDirection:"row",alignItems:"center",left:10}}>
                    <Image
                        source={item.user.profilepicture ? { uri: item.user.profilepicture } : require('../assets/pictures/profile.jpg')}
                        style={{ height: 40, width: 40,borderRadius:100 }}
                        resizeMode="cover"
                    />
                    <View style={{backgroundColor:"#292C35",left:20,paddingTop:5,paddingLeft:10,padding:10,marginTop:10,borderRadius:20}}>
                    <Text style={{ color: "#0677E8", fontSize: 16 }}>{item.user.FullName}</Text>
                    <Text style={{ color: "white", fontSize: 15 }}>{item.message}</Text>
                    </View>
                </View>
                
            </View>
        );
    };


    return (
        <KeyboardAvoidingView
            style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={{marginTop:20,left:10,flexDirection:"row",gap:20,alignItems:"center",marginBottom:30}}>
               <TouchableOpacity onPress={() => navigation.navigate("Tab")}>
               <Backk/>
               </TouchableOpacity>
                <Text style={{fontSize:25,color:"white"}}>
                    Comments
                </Text>
            </View>
            <FlatList
            
                data={commentsbyuser}
                renderItem={renderPost}
                keyExtractor={(item: any) => item._id}
            />
            <View style={styles.contentContainer}>


            </View>
            <View style={[styles.textInputContainer, { marginBottom: keyboardIsOpen ? 14 : 14 }]}>
                <TextInput
                    placeholder="What's on your mind?"
                    placeholderTextColor={'gray'}
                    style={{ width: "100%", height: 40, fontSize: 16 }}
                    onChangeText={setmessage}
                    value={message}
                />
                <View style={styles.sendContainer}>

                    <TouchableOpacity onPress={LikeFunc}>
                        <Send />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#131621"
    },
    contentContainer: {
        flex: 1,
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginHorizontal: 10,
    },
    sendContainer: {
        left: -30
    },
});

export default Comment;
