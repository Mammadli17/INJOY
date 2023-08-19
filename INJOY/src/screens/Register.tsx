import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Button,
  TouchableOpacity,
  Keyboard,
  Alert
} from 'react-native';
import Back from '../assets/Svgs/Back';
import Profile from '../assets/Svgs/Profile';
import Email from '../assets/Svgs/Email';
import Lock from '../assets/Svgs/Lock';
import Hide from '../assets/Svgs/Hide';
import HideO from '../assets/Svgs/HideO';
import Google from '../assets/Svgs/Google';
import Iphone from '../assets/Svgs/Iphone';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux';
import { postData } from '../redux/slices/LoginSlice';

const Register = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const fullNameRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleFullNameChange = (text: string) => {
    setFullName(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleFullNameFocus = () => {
    setFullNameFocused(true);
    setEmailFocused(false);
    setPasswordFocused(false);
    // scrollToInput(fullNameRef);
  };

  const handleFullNameBlur = () => {
    setFullNameFocused(false);
  };

  const handleEmailFocus = () => {
    setEmailFocused(true);
    setFullNameFocused(false);
    setPasswordFocused(false);
    scrollToInput(emailRef);
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    setFullNameFocused(false);
    setEmailFocused(false);
    scrollToInput(passwordRef);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const dispatch = useDispatch<AppDispatch>();
  
  const scrollToInput = (ref: any) => {
    if (ref.current && scrollViewRef.current) {
      ref.current.measureLayout(
        scrollViewRef.current.getInnerViewNode(),
        (x: number, y: number) => {
          // Y değerini biraz azaltarak kaydırmanın daha az olmasını sağla
          const yOffset = y - 300; // 100 değeri değiştirilebilir, deneyerek uygun değeri bulabilirsiniz
          scrollViewRef.current?.scrollTo({ y: yOffset, animated: true });
        },
        () => {},
      );
    }
  };
  const handleLogin = () => {
 
    // Email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (email && password && fullName) {
      if (!emailRegex.test(email)) {
        // Email format is invalid, display alert
        Alert.alert('Please enter a valid email address')
        return;
      }
  
      dispatch(postData({ email, password, fullName }))
        .then(res => {
           navigation.navigate('Otp',{ email });
        })
        .catch(error => {
          (error);
        });
    } else {
      Alert.alert('Please enter everything');
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
    //   enabled={false}
    >
      <ScrollView
      contentContainerStyle={styles.scrollContainer}
      ref={scrollViewRef}
      keyboardShouldPersistTaps="handled"
      scrollEventThrottle={16}
    
      >
        <View style={{ marginTop: '5%' }}>
          <Back />
        </View>
        <View style={styles.header}>
          <Text style={styles.headertext}>Create your Account</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={[styles.inputContainer, fullNameFocused && styles.focusedBorder]}>
            <View style={styles.profileIcon}>
              <Profile />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#A9A9A9"
              onChangeText={handleFullNameChange}
              onFocus={handleFullNameFocus}
              onBlur={handleFullNameBlur}
              ref={fullNameRef}
            />
          </View>
          <View style={[styles.inputContainer, emailFocused && styles.focusedBorder]}>
            <View style={styles.profileIcon}>
              <Email />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              placeholderTextColor="#A9A9A9"
              onChangeText={handleEmailChange}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              ref={emailRef}
            />
          </View>
          <View style={[styles.inputContainer, passwordFocused && styles.focusedBorder]}>
            <View style={styles.profileIcon}>
              <Lock />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#A9A9A9"
              secureTextEntry={!passwordVisible}
              onChangeText={handlePasswordChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              ref={passwordRef}
            />
            <View style={styles.HideIcon}>
              <TouchableOpacity onPress={togglePasswordVisibility}>
                {passwordVisible ? <HideO /> : <Hide />}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={{ textAlign: "center", top: "30%", fontSize: 20 }}>
              Register
            </Text>
          </TouchableOpacity>

          <View style={{ marginTop: 20, flexDirection: "row", gap: -70 }}>
            <Text style={{ marginHorizontal: 80, fontSize: 14 ,color:"white"}}>
              Already Have An Account?
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('SignIn')} >
              <Text style={{ color: "#0677E8" }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line}>

          </View>
          <Text style={{ textAlign: "center", fontSize: 14, marginTop: 15,color:"white" }}>
            Continue With Accounts
          </Text>

          <View style={{ flexDirection: "row", marginHorizontal: 20, gap: 10, marginTop: 20 }}>
            <Google />
            <Iphone />
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131621',
    flex: 1,
    paddingBottom: 20,
  },
  scrollContainer: {
    flexGrow: 0.2,
  },
  header: {
    marginTop: '5%',
    marginHorizontal: 20,
  },
  headertext: {
    fontSize: 40,
    fontWeight: '500',
    color:"white"
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginTop: 20,
    marginHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#292C35',
  },
  focusedBorder: {
    borderColor: '#0677E8',
  },
  profileIcon: {
    padding: 10,
    left: 8,
  },
  input: {
    flex: 1,
    height: 60,
    paddingHorizontal: 10,
    color: 'white',
    paddingLeft: 20,
  },
  HideIcon: {
    right: 10,
  }, button: {
    backgroundColor: "#0677E8",
    height: 60,
    marginHorizontal: 30,
    marginTop: 20,
    borderRadius: 10
  }, line: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 10,
    marginTop: 30
  },
});

export default Register;
