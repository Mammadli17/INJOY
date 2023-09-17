import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const onBoardingData = [
  {
    title: 'Welcome To The Fun Magic Media',
    description: 'Dummy text is also used to demonstrate the appearance of different typefaces and layouts',
    image: require('../assets/pictures/onbording1.png'),
  },
  {
    title: 'Best Social App To Make New Friends',
    description: 'Dummy text is also used to demonstrate the appearance of different typefaces and layouts',
    image: require('../assets/pictures/onbording2.png'),
  },
  {
    title: 'Enjoy Your Life Every Time',
    description: 'Dummy text is also used to demonstrate the appearance of different typefaces and layouts',
    image: require('../assets/pictures/onbording3.png')
  },
];

const OnBoarding = ({ navigation }: any) => {

  const handleFinishOnboarding = async () => {
    try {
      // Store onboarding completion status in AsyncStorage
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      navigation.navigate('Register'); // Replace 'RegistrationScreen' with the actual name of the registration screen in your app.
    } catch (error) {
      // Handle error, if any
      
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        loop={false}
        style={styles.swiperContainer}
        dotStyle={styles.swiperDot}
        activeDotStyle={styles.swiperActiveDot}
      >
        {onBoardingData.map((item, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.image}>
              <Image source={item.image} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            {index === onBoardingData.length - 1 && ( // Show the button only on the last slide
              <TouchableOpacity onPress={handleFinishOnboarding} style={styles.finishButton}>
                <Text style={styles.finishButtonText}>Get Started</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131621',
    flex: 1,
  },
  swiperContainer: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {},
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 30,
  },
  description: {
    color: '#B3B2B2',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginTop: 10,
  },
  swiperDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  swiperActiveDot: {
    backgroundColor: 'white',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  finishButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    top:20
  },
  finishButtonText: {
    color: '#131621',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnBoarding;
