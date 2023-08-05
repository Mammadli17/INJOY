import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";


export async function tokenCheck() : Promise<Boolean> {

    let token: any = await AsyncStorage.getItem("token");
   console.log(token);
   

    let userStatus = false;

    if (token) {
        await axios.post("http://192.168.100.31:8080/token", { token: token })
            .then(res => {
                userStatus = true
                console.log("okkkkkkk");
                
            })
            .catch(err => {
                userStatus = false;
                console.log(err);
                
            })
    }
    else {
        return false;
    }

    return userStatus;
}