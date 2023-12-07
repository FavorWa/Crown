import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BACKEND_BASE_ANDROID, BACKEND_BASE_IOS } from '../secrets';
import { GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';


const backend_base_url = Platform.OS === 'android' ? BACKEND_BASE_ANDROID : BACKEND_BASE_IOS;


const BookAppointment = ({navigation}) => {
    const route = useRoute();
    // Accessing parameters from the route
    const stylistEmail = route.params.stylistEmail;
    const stylistName = route.params.stylistName;
    const stylistAvatar = route.params.stylistAvatar;
    const userName = route.params.userName;
    const userAvatar = route.params.userAvatar;
    const userEmail = route.params.userEmail;
    const [messages, setMessages] = useState([])

    useEffect(() => {

        // Load conversation when component mounts or when users talk
        fetch_conversation(userEmail, stylistEmail)
          .then((conversation) => {
            if (conversation) {
                const reversedMessages = conversation.messages.map((message) => ({
                    _id: message._id,
                    text: message.text,
                    createdAt: new Date(message.timestamp),
                    user: {
                        _id: message.sender === userEmail ? 1 : 2,
                        name: message.sender === userEmail ? userName : stylistName,
                        avatar: message.sender === userEmail ? userAvatar : stylistAvatar,
                    },
                    }))
                    .reverse(); // Reverse the array
        
                setMessages([...reversedMessages]);
            } else {
              console.log('Conversation not found');
              // Handle the case when the conversation is not found
            }
          });
    }, [userEmail, stylistEmail, userName, userAvatar, stylistName, stylistAvatar]);
    
    
    const onSend = useCallback((messages = []) => {
        // Send the new message to MongoDB
        sendMessageToMongoDB(messages[0].text);
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    const sendMessageToMongoDB = async (messageText) => {
        try {
            const response = await fetch(`${backend_base_url}/send_message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentUser: userEmail,
                    otherUser: stylistEmail,
                    text: messageText,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to send message');
            } else{
                console.log('Message sent successfully');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    
    const fetch_conversation = async (participant1, participant2) => {
        try {
          const response = await fetch(`${backend_base_url}/fetch_conversation?participant_1=${participant1}&participant_2=${participant2}`);
      
          if (!response.ok) {
            throw new Error('Failed to load conversation');
          }
      
          const conversationData = await response.json();
          return conversationData;
        } catch (error) {
          console.error('Error loading conversation:', error);
          // Handle the error appropriately in your application
          return null;
        }
    };
    
    const CustomSendButton = (props) => {
      return (
        <Send {...props}>
          <Image
            source={require('../assets/SendMessageIcon.png')}
            style={{ height: 40, width: 40, top: 0, left: -10}}
          ></Image>
        </Send>
      );
    };

    
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/gobackIcon.png')}
                style={{ height: 40, width: 40, top: 10, left: 20}}
              ></Image>
            </TouchableOpacity>

            <Image
              source={stylistAvatar}
              style={{top: -30, left: 80, height: 50, width: 50, borderRadius: 40, borderWidth: 1, borderColor: '#431a38'}}
            ></Image>
            <Text style={{ fontSize: 30, top: -70, left: 140}}>{stylistName}</Text>

            <GiftedChat
              messages={messages}
              showAvatarForEveryMessage={true}
              showUserAvatar={true}
              renderUsernameOnMessage={true}
              onSend={onSend}
              user={{
                _id: 1,
                name: userName,
                avatar: userAvatar,
              }}
              placeholder='Begin your inquiry...'
              textInputProps={{
                style: {
                  borderRadius: 30,
                  backgroundColor: '#D9D9D9',
                  marginLeft: 20,
                  marginRight: 20,
                  fontSize: 16,
                  width: 320,
                  height: 30,
                  top: -5, 
                },
              }}
              renderSend={(props) => <CustomSendButton {...props} />}
              renderInputToolbar={(props) => (
                <InputToolbar {...props} containerStyle={{borderTopWidth: 0}} />
              )}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

  export default BookAppointment