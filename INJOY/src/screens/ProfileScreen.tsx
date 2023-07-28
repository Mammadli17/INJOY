import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Image, Button, Text } from 'react-native';
import { launchImageLibrary, ImageLibraryOptions, Asset } from 'react-native-image-picker';
import uploadProfilePicture from '../ApiPosts/uploadProfilePicture';

const ImagePickerComponent = () => {
  const [imageUri, setImageUri] = useState<any>('');
  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const user: any = await AsyncStorage.getItem('user');
      const parsedUserData = JSON.parse(user);
      setUserData(parsedUserData);
      console.log("us", parsedUserData);
    } catch (error) {
      console.error('Hata:', error);
    }
  };


  const pickImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo', // You can also use 'video' or 'mixed' depending on your requirements
    };
  
    launchImageLibrary(options, async (response: any) => {
      if (response && !response.didCancel) {
        await setImageUri(response.assets[0].uri);
        console.log("imageee",imageUri);
        
        console.log(userData._id); // Check if userData._id is correctly logged
        try {
          // Assuming uploadProfilePicture function accepts _id and imageUri as parameters
          uploadProfilePicture(userData._id,imageUri)
          console.log('Image uploaded successfully!');
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    });
  };  
 
  
 
  return (
    <View>
      {imageUri && <Image source={{
          uri:imageUri,
        }}
        style={{height:50,width:50}} />}
      <Button title="Resim Seç" onPress={pickImage} />
      {userData && <Text style={{ fontSize: 21, color: "red" }}>{userData.email}</Text>}
    </View>
  );
};

export default ImagePickerComponent;
