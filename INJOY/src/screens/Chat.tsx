import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator,Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, userReducer } from '../redux/slices/UserSlice';
import { AppDispatch } from '../redux';



const UserProfilePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data ,error , loading} = useSelector((state: any) => state.User);

  useEffect(() => {
    // Fetch user data when the component mounts
    dispatch(fetchUser({  _id: '64c4131e87e34c429e2e8048' }));
  }, []);

  if (loading === 'pending') {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text style={{backgroundColor:"red"}}>Error: {error.message}</Text>
      </View>
    );
  }

  if (data) {
    // Display user data once it's fetched
    return (
      <View>
        <Text>Name: {data.name}</Text>
        <Text>Email: {data.email}</Text>
        <Text style={{color:"red"}}>

          {data.profilepicture}
        </Text>
        <Image
    
       source={{ uri : data.profilepicture}}
        style={{ width: 100, height: 100 }}
      />
        {/* Add more fields as per your response data */}
      </View>
    );
  }

  // If loading is null, it means the data has not been fetched yet
  return null;
};

export default UserProfilePage;
