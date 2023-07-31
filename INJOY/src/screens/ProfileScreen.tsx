import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, Button, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const App = () => {
  const [files, setFiles] = useState([]);

  const getFiles = () => {
    axios.get('http://192.168.100.27:8080/api/images')
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  };

  const [file, setFile] = useState<any>({});
  console.log(files);
  const renderFiles = () => {
   
    
    return files.map((file  : any, index) => (
     <>
         
      <Image
        key={index}
        source={{ uri: file.url }}
        style={{ width: 100, height: 100 }}
      />
     </>
    ));
  };

  const upload = () => {
    launchImageLibrary(
      {
        mediaType: 'photo'
      },
      response => {
        if (!response.didCancel) {
          setFile(response);
        }
      }
    );
  };

  const postFile = () => {
    if (!file || !file.assets || file.assets.length === 0) {
      console.log('Select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('profileImg', {
      uri: file.assets[0].uri,
      name: file.assets[0].fileName,
      type: file.assets[0].type,
    });
    formData.append('userId', "64c4131e87e34c429e2e8048" );

    axios.post('http://192.168.100.27:8080/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      console.log('Upload successful!');
    })
    .catch(error => {
      console.log('Upload error:', error);
    });
  };

  return (
    <View style={{ backgroundColor: 'white', padding: 20 }}>
      <Button title='Upload' onPress={upload} />
      <Button title='POST' onPress={postFile} />
      <Button title='GET' onPress={getFiles} />
      
      
      {renderFiles()}
    </View>
  );
};

export default App;
