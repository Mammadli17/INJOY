import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckOnbording = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    checkOnboardingStatus();
  }, []);
 


  
  const checkOnboardingStatus = async () => {
    try {
      // Check if onboarding has been completed
      const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
      if (onboardingCompleted === 'true') {
        // Navigate to the registration screen or any other desired screen
        // Replace 'Onboarding' with the actual name of your Onboarding component
        navigation.navigate('Register'); // Replace 'RegistrationScreen' with the actual name of the registration screen in your app.
      } else {
        // Onboarding has not been completed, show the onboarding screen
        navigation.navigate('OnBoard'); // Replace 'OnBoard' with the actual name of your Onboarding component
      }
    } catch (error) {
      // Handle error, if any
      console.log('Error checking onboarding status:', error);
      // In case of any error, you can choose to show the onboarding screen by default
      navigation.navigate('Onboarding'); // Replace 'Onboarding' with the actual name of your Onboarding component
    } finally {
      // Set loading state to false when the onboarding status check is complete
      setLoading(false);
    }
  };

  // Render the loading view while checking the onboarding status
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#131621' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  // If the loading process is complete, return an empty view or any other content you want to display
  return (
    <View style={{ flex: 1, backgroundColor: '#131621' }}>
      {/* Your other content or components go here */}
    </View>
  );
};

export default CheckOnbording;
