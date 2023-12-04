import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BACKEND_BASE_ANDROID, BACKEND_BASE_IOS } from '../secrets';
import { GiftedChat } from 'react-native-gifted-chat'
import { selectableImages } from './User';
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
    const selectedAvatarSource = selectableImages[userAvatar];

    const [messages, setMessages] = useState([])

    useEffect(() => {
        // Load conversation when component mounts or when users talk
        fetch_conversation(userEmail, stylistEmail)
          .then((conversation) => {
            if (conversation) {
                const reversedMessages = conversation.messages
                    .map((message) => ({
                    _id: message._id,
                    text: message.text,
                    createdAt: new Date(message.timestamp),
                    user: {
                        _id: message.sender === userEmail ? 1 : 2,
                        name: message.sender === userEmail ? userName : stylistName,
                        avatar: message.sender === userEmail ? selectedAvatarSource : stylistAvatar,
                    },
                    }))
                    .reverse(); // Reverse the array
        
                setMessages([...reversedMessages]);
            } else {
              console.log('Conversation not found');
              // Handle the case when the conversation is not found
            }
          });
    }, [userEmail, stylistEmail, userName, selectedAvatarSource, stylistName, stylistAvatar]);
    
    
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

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/gobackIcon.png')}
                style={{ height: 30, width: 30, top: 0, left: 20}}
              ></Image>
            </TouchableOpacity>

            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={true}
                showUserAvatar={true}
                onSend={onSend}
                user={{
                    _id: 1,
                    name: userName, // You can set a default name if needed
                    avatar: selectedAvatarSource,
                }}
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