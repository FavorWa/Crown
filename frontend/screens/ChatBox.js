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
    const stylistName = route.params.stylistName;
    const stylistAvatar = route.params.stylistAvatar;
    const userName = route.params.userName;
    const userAvatar = route.params.userAvatar;
    const selectedAvatarSource = selectableImages[userAvatar];

    const [messages, setMessages] = useState([])
    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello Customer',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: stylistName,
                avatar: stylistAvatar,
            },
          },
          {
            _id: 2,
            text: 'Hello Stylist',
            createdAt: new Date(),
            user: {
              _id: 1,
              name: userName,
              avatar: selectedAvatarSource,
            },
          },
        ])
      }, [])
    
    const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
    )
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <Text>Stylist Name: {stylistName}</Text>
            <Text>Stylist Avatar: {stylistAvatar}</Text>
            <Text>User Name: {userName}</Text>
            <Text>User Avatar: {userAvatar}</Text>
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