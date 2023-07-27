import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckToken from './CheckToken';
import OnBoarding from './OnBoarding';

const CheckOnbording = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
      if (onboardingCompleted === 'true') {
        navigation.navigate('CheckToken'); // Navigate to the 'CheckToken' screen/component
      } else {
        navigation.navigate('OnBoard'); // Navigate to the 'OnBoarding' screen/component
      }
    } catch (error) {
      console.log('Error checking onboarding status:', error);
      // Handle the error if necessary
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#131621' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#131621' }}>
      {/* Your other content or components go here */}
    </View>
  );
};

export default CheckOnbording;
