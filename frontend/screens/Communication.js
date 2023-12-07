import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { selectableImages } from './User';
import { BACKEND_BASE_ANDROID, BACKEND_BASE_IOS } from '../secrets';
import { useRoute } from '@react-navigation/native';


const backend_base_url = Platform.OS === 'android' ? BACKEND_BASE_ANDROID : BACKEND_BASE_IOS;


export default function Communication({ navigation }) {
    const [userName, setuserName] = useState('');
    const [userId, setuserId] = useState('');
    const [userAvatar, setUserAvatar] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [conversationData, setConversationData] = useState([]);

    useEffect(() => {
      const fetchUserAvatar = async () => {
        const avatarUrl = await AsyncStorage.getItem('userAvatar').catch(error => {
          console.error('Error fetching user avatar:', error);
        });
        if (avatarUrl) {
          setUserAvatar(await AsyncStorage.getItem('userAvatar'));
          setuserName(await AsyncStorage.getItem('userName'));
          setuserId(await AsyncStorage.getItem('userId'));
          setUserEmail(await AsyncStorage.getItem('userEmail'));
        }
      };
      fetchUserAvatar();
    }, []);

    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`${backend_base_url}/check_message?userEmail=${userEmail}`);
    
          if (!response.ok) {
            throw new Error('Failed to load conversation');
          }
          
          const conversationData = await response.json();
          console.log(conversationData);
          setConversationData(conversationData|| []);
        } catch (error) {
          console.error('Error loading conversation:', error.message);
          // Handle the error appropriately in your application
        }
      };
    
      fetchMessages();
    }, [userEmail]);

    return (
        <View>
            <Text style={{ top: 50, left: 33, fontSize: 28, fontWeight: '500' }}>{userName}</Text>

            <ScrollView style={{ top: 80, height: 700 }}>
              {conversationData.map((item, index) => {
                let [name, email, status, avatar] = item;
                if (avatar in selectableImages) {avatar = selectableImages[avatar]}
                if (userAvatar in selectableImages) {setUserAvatar(selectableImages[userAvatar])}
                // console.log(avatar);
                return (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate('ChatBox', { stylistEmail: email, stylistName: name, stylistAvatar: avatar, userName: userName, userAvatar: userAvatar, userEmail: userEmail })}>
                    <View key={index} style={{marginVertical: 0, height: 70}}>
                    <Image
                      source={avatar}
                      style={{left: 33, height: 50, width: 50, borderRadius: 25, borderWidth: 2, borderColor: '#431a38'}}
                    ></Image>
                      <Text style={{ fontSize: 30, left: 100, top: -45,}}>{name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 175 }}>
                <View style={styles.Bottonline}>
                    <TouchableOpacity onPress={() => navigation.replace('Homepage')}>
                        <Image
                            source={require('../assets/Compass.png')}
                            style={styles.Compass}
                        ></Image>
                        <Text style={styles.Compassword}>Discover</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.replace('Stylist')}>
                        <Image
                            source={require('../assets/Barbershop.png')}
                            style={styles.Barbershop}
                        ></Image>
                        <Text style={styles.Barbershopword}>Stylist</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.replace('User')}>
                        <Image source={selectableImages[userAvatar]} style={styles.bottomAvatar} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
  }

const styles = StyleSheet.create({
  Compass: {
    aspectRatio: 1.2,
    marginLeft: 75,
    marginTop: 15,
  },
  Compassword: {
    marginLeft: 70,
  },
  Barbershop: {
    aspectRatio: 1.2,
    marginLeft: 200,
    marginTop: -55,
  },
  Barbershopword: {
    marginLeft: 203,
    marginBottom: -40,
  },
  Bottonline: {
    width: 430,
    height: 210,
    flexShrink: 0,
    borderRadius: 39,
    borderWidth: 1,
    borderColor: '#472415',
    marginHorizontal: 30,
    backgroundColor: 'white',
  },
  bottomAvatar: {
    width: 55,
    height: 55,
    borderRadius: 40,
    marginLeft: 315,
    marginVertical: -55,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  Contentlist: {
    left: 330,
    marginTop: 60,
    height: 30,
    width: 60,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 15,
    marginTop: 10,
  },
});