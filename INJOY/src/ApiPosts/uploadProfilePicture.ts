import axios from 'axios';

const uploadProfilePicture = async (userId: any, image: any) => {
  console.log(userId);
  console.log(image);

  try {
    const formData = new FormData();
   
    
    // Oluşturulan File nesnesini FormData'ya ekle
    const file = {
      uri: image.uri,
      type: image.type,
      name: image.fileName, // image.fileName değerini kullanmalısınız
    };
    formData.append('profileImg', file);

    formData.append('_id', userId);

    const response = await axios.post('http://192.168.100.27:8080/api/user/updateProfile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Failed to upload profile picture:', error);
    throw error;
  }
};

export default uploadProfilePicture;
