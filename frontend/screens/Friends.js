import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';


export const selectableImages = {
  'avatar1': require('../assets/avatar1.avif'),
  'avatar2': require('../assets/avatar2.jpeg'),
  'avatar3': require('../assets/avatar3.jpeg'),
  'avatar4': require('../assets/avatar4.jpeg'),
  'avatar5': require('../assets/avatar5.jpeg'),
  'avatar6': require('../assets/avatar6.jpeg'),
  'avatar7': require('../assets/avatar7.jpeg'),
  'avatar8': require('../assets/avatar8.avif'),
  'avatar9': require('../assets/avatar9.webp'),
  'avatar10': require('../assets/avatar10.jpeg'),
  'avatar11': require('../assets/avatar11.jpeg'),
  'avatar12': require('../assets/avatar12.jpeg'),
  'avatar13': require('../assets/avatar13.jpeg'),
  'avatar14': require('../assets/avatar14.jpeg'),
  'avatar15': require('../assets/avatar15.jpeg'),
  'avatar16': require('../assets/avatar16.jpeg'),
  'avatar17': require('../assets/avatar17.jpeg'),
  'avatar18': require('../assets/avatar18.jpeg'),
  'avatar19': require('../assets/avatar19.jpeg'),
  'avatar20': require('../assets/avatar20.avif')
};
const Nums = [
  'avatar1',
  'avatar2',
  'avatar3',
  'avatar4',
  'avatar5',
  'avatar6',
  'avatar7',
  'avatar8',
  'avatar9',
  'avatar10',
  'avatar11',
  'avatar12',
  'avatar13',
  'avatar14',
  'avatar15',
  'avatar16',
  'avatar17',
  'avatar18',
  'avatar19',
  'avatar20'
];

export default function Friends({ navigation }) {
    const [userName, setuserName] = useState('');
    const [userId, setuserId] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    
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

    const changeAvatar = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      console.log(email);
      const randomNum = Math.floor(Math.random() * 20);
      const avatarNumber = Nums[randomNum];

      fetch('http://localhost:8000/change_avatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        avatarNumber: avatarNumber,
      })
    })
      .then(response => response.json())
      .then(async data => {
        if (data.detail) {
          // console.error('Error:', data.detail); // Log the error if there is one
        } else {
          await AsyncStorage.setItem('userAvatar', avatarNumber);
          setUserAvatar(avatarNumber);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    return (
        <View>
              
            <View style={{ height: 40, width: 40, top: 50, left: 20 }}>
                <TouchableOpacity onPress={toggleModal}>
                    <Image
                        source={selectableImages[userAvatar]}
                        style={styles.avatar}
                    ></Image>
                </TouchableOpacity>

                <Text style={styles.username}> {userName} </Text>
                <Text style={styles.userId}> ID: {userId} </Text>
            </View>
        
            <Modal isVisible={isModalVisible}>
            <View style={styles.modalContent}>
                <Image
                source={selectableImages[userAvatar]}
                style={styles.enlargedAvatar}
                />
                <TouchableOpacity onPress={changeAvatar}>
                <Text style={styles.changeAvatarButton}>Change Avatar</Text>
                </TouchableOpacity>
                <Button title="Close" onPress={toggleModal} />
            </View>
            </Modal>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: 870 }}>
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