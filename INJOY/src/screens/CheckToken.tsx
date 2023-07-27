import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { tokenCheck } from '../util/authHelper';
import { login, signout } from '../redux/slices/loginSliceC';

const CheckToken = ({ navigation }: any) => {
  const isLoggedIn = useSelector((state: { login: { value: boolean } }) => state.login.value);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to check the token and update the loading state and Redux state accordingly
    const checkTokenAndLogin = async () => {
      try {
        const res = await tokenCheck();
        if (res === true) {
          dispatch(login());
        } else {
          dispatch(signout());
        }
      } catch (error) {
        console.log('Error checking token:', error);
        // Handle error if necessary
      } finally {
        setloading(false);
      }
    };

    checkTokenAndLogin();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) {
        navigation.navigate('Tab');
        console.log("Navigating to 'Tab' screen.");
      } else {
        navigation.navigate('Register');
        console.log("Navigating to 'Register' screen.");
      }
    }
  }, [loading]);

  // Yükleme durumunu kontrol et ve gerekli bileşeni döndür
  const renderContent = () => {
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#131621' }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      );
    }
    // Return null if not loading (component will navigate based on the state)
    return <View style={{ flex: 1, backgroundColor: '#131621' }}>
    {/* Your other content or components go here */}
  </View>
  };

  return renderContent();
};

export default CheckToken;
