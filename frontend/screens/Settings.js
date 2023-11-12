import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { selectableImages } from './User';

export default function Friends({ navigation }) {
    const [userName, setuserName] = useState('');
    const [userId, setuserId] = useState('');
    const [userAvatar, setUserAvatar] = useState(null);
    useEffect(() => {
      const fetchUserAvatar = async () => {
        const avatarUrl = await AsyncStorage.getItem('userAvatar').catch(error => {
          console.error('Error fetching user avatar:', error);
        });
        if (avatarUrl) {
          setUserAvatar(await AsyncStorage.getItem('userAvatar'));
          setuserName(await AsyncStorage.getItem('userName'));
          setuserId(await AsyncStorage.getItem('userId'));
        }
      };
  
      fetchUserAvatar();
    }, []);

    

    return (
        <View>
              
            

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: 910 }}>
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

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Image
                    source={require('../assets/Community.png')}
                    style={styles.Community}
                  ></Image>
                  <Text style={styles.Communityword}>Community</Text>
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
    marginLeft: 35,
    marginTop: 15,
  },
  Compassword: {
    marginLeft: 30,
  },
  Barbershop: {
    aspectRatio: 1.2,
    marginLeft: 135,
    marginTop: -55,
  },
  Barbershopword: {
    marginLeft: 135,
    marginBottom: -40,
  },
  Community: {
    aspectRatio: 1.2,
    marginLeft: 235,
    marginTop: -55,
  },
  Communityword: {
    marginLeft: 225,
    marginBottom: -40,
  },
  User: {
    marginLeft: 335,
    marginTop: -55,
    aspectRatio: 1.2,
  },
  Userword: {
    marginLeft: 338,
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
    marginLeft: 330,
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
  username: {
    width: 80,
    height: 20,
    fontWeight: 'bold',
    left: 120,
    top: -70,
  },
  userId: {
    width: 200,
    height: 20,
    fontSize: 12,
    left: 120,
    top: -50,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  enlargedAvatar: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  changeAvatarButton: {
    marginTop: 20,
    fontSize: 30,
    color: 'blue',
  },
});