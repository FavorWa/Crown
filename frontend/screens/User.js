import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Drawer } from 'react-native-drawer-layout';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';


export const selectableImages = {
  'avatar1': require('../assets/avatar1.avif'),
  'avatar2': require('../assets/avatar2.jpeg'),
  'avatar3': require('../assets/avatar3.jpeg'),
  'avatar4': require('../assets/avatar4.jpeg'),
  'avatar5': require('../assets/avatar5.jpeg'),
  'avatar6': require('../assets/avatar6.jpeg'),
  'avatar7': require('../assets/avatar7.jpeg'),
  'avatar8': require('../assets/avatar8.avif'),
  'avatar9': require('../assets/avatar9.webp')
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
  'avatar9'
];

export default function DrawerExample({ navigation }) {
    const [open, setOpen] = React.useState(false);

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
        }
      };
  
      fetchUserAvatar();
    }, []);
    // const [location, setLocation] = useState(null);
    // const [errorMsg, setErrorMsg] = useState(null);
    // useEffect(() => {
    //     (async () => {
          
    //       let { status } = await Location.requestForegroundPermissionsAsync();
    //       if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied');
    //         return;
    //       }

    //       let location = await Location.getCurrentPositionAsync({});
    //       setLocation(location);
    //     })();
    //   }, []);

    // if(location){console.log(location)}


    const changeAvatar = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      const randomNum = Math.floor(Math.random() * 10);
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
          console.error('Error:', data.detail); // Log the error if there is one
        } else {
          await AsyncStorage.setItem('userAvatar', avatarNumber);
          setUserAvatar(avatarNumber);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    const logout = async () => {
      await AsyncStorage.setItem('userEmail', '');
      await AsyncStorage.setItem('userPassword', '');
      await AsyncStorage.setItem('keepLogIn', 'false');
      await AsyncStorage.setItem('LoginStatus', 'false'); 
      console.log('log out');
      setOpen(false);
      navigation.navigate('Cover');
    };

    return (
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderDrawerContent={() => (
          <View>
            <TouchableOpacity onPress={() => navigation.replace('Homepage')}> 
              <Text style={styles.Discover}> HomePage </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <Image
                    source={require('../assets/logout.png')}
                    style={styles.LogoutIcon}
              ></Image>
              <Text style={styles.Logout}>Log Out</Text>
            </TouchableOpacity>
          </View>
        )}
      >
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setOpen((prevOpen) => !prevOpen) }>
                <Image
                    source={require('../assets/content_list.png')}
                    style={styles.Contentlist}
                ></Image>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleModal}>
              <Image
                  source={selectableImages[userAvatar]}
                  style={styles.avatar}
              ></Image>
            </TouchableOpacity>

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

            <Text style={styles.username}> username </Text>

            <Text style={styles.userId}> userId </Text>
        </View>
      </Drawer>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE0D4',
  },
  Contentlist: {
    marginLeft: 10,
    marginTop: 15,
    height: 30,
    width: 60,
    marginLeft: 10,  
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 15,
    marginTop: 40,
  },
  username: {
    width: 80,
    height: 20,
    fontWeight: 'bold',
    marginLeft: 120,
    marginTop: -60,
  },
  userId: {
    width: 80,
    height: 20,
    fontSize: 12,
    marginLeft: 120,
    marginTop: 10,
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
  LogoutIcon: {
    marginTop: 20,
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  Logout: {
    alignSelf: 'center',
  },
  Discover: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 20,
  },
});