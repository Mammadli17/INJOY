import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList,TouchableOpacity } from 'react-native';
import Send from '../assets/Svgs/Send';
const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
const GPT: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]); // Initialize with an empty array
  const [inputText, setInputText] = useState<string>('');
  const handleSendMessage = useCallback(async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ApiKey}`,
        },
        body: JSON.stringify({
          prompt: inputText,
          max_tokens: 50,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = data.choices[0].text.trim();
        setMessages([...messages, { text: inputText, aiText: aiMessage }]);

        setInputText('');
      } else {
        console.log('API Hatası:', response.statusText);
      }
    } catch (error) {
      console.error('Hata:', error);
    }
  }, [inputText, messages]);
  console.log(messages, "item");
  const renderChat = ({ item }: any) => (
    <>
      <View>
        <View style={{ justifyContent: "flex-end", flexDirection: "row", right: 20, marginBottom: 20 }}>
          <Text style={{ backgroundColor: "#2F6C9F", padding: 10, borderRadius: 10, color: "white" }} >{item.text}</Text>
        </View>
        <View style={{ marginBottom: 20, marginHorizontal: 20, paddingRight: 50 }}>
          <Text style={{ backgroundColor: "#292C35", padding: 10, borderRadius: 10, color: "white" }} >{item.aiText}</Text>
        </View>
      </View>
    </>
  )
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Chat with GPT</Text>
      <FlatList
        data={messages}
        renderItem={renderChat}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={[styles.textInputContainer, ]}>
        <TextInput
          placeholder="Send a message"
          placeholderTextColor={'gray'}
          style={{ width: "100%", height: 40, fontSize: 16 }}
          onChangeText={(text) => setInputText(text)}
          value={inputText}
        />
        <View style={styles.sendContainer}>
          <TouchableOpacity onPress={handleSendMessage}>
            <Send />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 10,
},
sendContainer: {
    left:-30
},
  container: {
    flex: 1,
    backgroundColor: '#131621',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
});

export default GPT;
