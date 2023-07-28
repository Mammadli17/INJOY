import axios from 'axios';

const uploadProfilePicture = (id:any,imageuri:any) => {

    console.log("functiona girdiiii");
    
    // console.log(_id);
    // console.log(picturelink);
    
    
    // Data to send in the request body
    const data = {
        _id:id,
        picturelink: imageuri
    };

    // Make the HTTP POST request using axios
    const response =  axios.post("http://192.168.100.27:8080/api/user/uploadProfil", data);
};

export default uploadProfilePicture;
