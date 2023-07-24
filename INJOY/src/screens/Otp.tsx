import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Back from '../assets/Svgs/Back';

const Otp = ({navigation}: any) => {
  const [otpValues, setOtpValues] = React.useState(['', '', '', '']);

  const otpInputs : any | null= [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleOtpChange = (index: number, value: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < otpInputs.length - 1 && otpInputs[index + 1].current) {
      otpInputs[index + 1].current.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0) {
      otpInputs[index - 1].current?.focus();
    }
  };

  const [timer, setTimer] = useState(120);



  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  return (
    <View style={{ backgroundColor: '#131621', flex: 1 }}>
      <View style={{marginTop:"5%"}}>
        
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Back/>
        </TouchableOpacity>
      </View>
      <View style={{ width: "85%", height: 450, backgroundColor: "#141416", left: 30, borderRadius: 30, marginTop: "16%" ,borderWidth:1,borderColor:"#0677E8",}}>
        <Text style={{ fontSize: 24, textAlign: "center", marginTop: "10%" }}>
          Verify Email
        </Text>
        <Text style={{ textAlign: "center", color: "gray", marginTop: "5%" }}>
          We Have Sent Code To Your Email
        </Text>
        <Text style={{ textAlign: "center", marginTop: "10%" }}>
          Your Email
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '5%' }}>
          {otpInputs.map((ref: any , index: any ) => (
            <TextInput
              key={index}
              ref={ref}
              style={{
                borderColor:"#0677E8",
                borderWidth:1,
                backgroundColor: "#141416",
                marginHorizontal: 5,
                borderRadius: 10,
                padding: 17,
                fontSize: 20,
                textAlign: "center",
                width: 60,
              }}
              placeholder="0"
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(value) => {
                handleOtpChange(index, value);
                if (!value) {
                  handleBackspace(index);
                }
              }}
              value={otpValues[index]}
            />
          ))}
        </View>

        <Text style={{ textAlign: "center", color: "gray", marginTop: "10%",fontSize:20 }}>
          {timer > 0 ? `Time remaining  : ${Math.floor(timer / 60)}:${timer % 60}` : 'Time is up'}
        </Text>

        <TouchableOpacity
          style={{backgroundColor:"#0677E8",marginHorizontal:30,marginTop:50,height:60,borderRadius:10}}
          onPress={()=>navigation.navigate("Tab")}
        >
          <Text style={{textAlign:"center",marginTop:"6%",fontSize:20}}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Otp;
