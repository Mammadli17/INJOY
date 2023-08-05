import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setimage] = useState<any>('')

  const handleImageSelect = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response:any) => {
        if (!response.didCancel) {
         setimage(response.assets[0])
         console.log(image);
         
          
        }
      }
    );
  };
  
         
  const handleImageUpload = () => {
    if (!image  || image.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });
    formData.append('_id', "64c951b3be3c0812f875d7e1");
    formData.append('title', "salammm");
    formData.append('content', "asdsadsadasdsad");

    axios.post('http://192.168.100.31:8080/api/s', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        // İstek başarılı oldu ve sunucudan bir cevap döndü.
        console.log('Başarılı cevap:', response.data);
      })
      .catch(error => {
        // İstek başarısız oldu veya sunucu hata döndürdü.
        console.error('Hata:', error);
      });
    }    

  return (
    <View>
      <TextInput
        placeholder="Post Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="Post Content"
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      {/* {imageUri && (
        <Image
          source={{ uri: imageUri }} // Pass the URI property of imageUri
          style={{ width: 200, height: 200, resizeMode: 'cover' }}
        />
      )} */}
      <Button title="Select Image" onPress={handleImageSelect} />
      <Button title="Add Post" onPress={handleImageUpload} />
    </View>
  );
};

export default AddPost;
