import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Backk from '../assets/Svgs/Backk'
import Password from '../assets/Svgs/Password'
import Help from '../assets/Svgs/Help'
import Log from '../assets/Svgs/Log'
import Kayd from '../assets/Svgs/Kayd'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signout } from '../redux/slices/loginSliceC'

const SettingScreen = ({ navigation }: any) => {
  let dispatch = useDispatch();

  const signoutApp = () => {
    AsyncStorage.removeItem("token")
      .then(res => {
        dispatch(signout())
        navigation.navigate("CheckToken")
      })
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#131621" }}>
      <View style={{ marginTop: 20, left: 10, flexDirection: "row", gap: 20, alignItems: "center", marginBottom: 30 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Tab")}>
          <Backk />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, color: "white" }}>
          Settings
        </Text>
      </View>

      <View style={{ gap: 40, marginTop: 30 }}>
        <View style={{ flexDirection: "row", left: 20, alignItems: "center" }}>
          <Password />
          <Text style={{ color: "white", fontSize: 20, left: 30, }}>
            Account Security
          </Text>
        </View>
        <View style={{ flexDirection: "row", left: 20, alignItems: "center" }}>
          <Help />
          <Text style={{ color: "white", fontSize: 20, left: 30, }}>
            Customer Support
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Saved")}>
          <View style={{ flexDirection: "row", left: 20, alignItems: "center" }}>
            <Kayd stroke={"#0C77E9"} width={"38"} height={'40'} />
            <Text style={{ color: "white", fontSize: 20, left: 30, }}>
              Saved
            </Text>

          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={signoutApp}>
          <View style={{ flexDirection: "row", left: 20, alignItems: "center" }}>
            <Log />
            <Text style={{ color: "white", fontSize: 20, left: 30, }}>
              Log Out
            </Text>

          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SettingScreen