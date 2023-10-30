import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Drawer } from 'react-native-drawer-layout';
import { getStatus, getEmail, getPassword } from './Login';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';


// console.log(getStatus());
// console.log(getEmail());
// console.log(getPassword());

export default function DrawerExample({ navigation }) {
    const [open, setOpen] = React.useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    useEffect(() => {
      if (!getStatus()) {
          navigation.navigate('Login'); // Replace 'Login' with the actual screen name for the login screen
      }
    }, []);

    const fetchUserInfo = () => {
      const emailValue = getEmail().toString();
      const passwordValue = getPassword().toString();

      fetch('http://localhost:8000/get_user_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log('Received data:', data);
          // Handle the user information here
      })
      .catch(error => {
          console.error('Error:', error);
          console.log("email", getEmail(), "password", getPassword());
      });
    };

    const changeAvatar = async () => {
      const emailValue = getEmail(); // Replace with the user's email
    
      ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
        if (!response.didCancel) {
          const data = new FormData();
          data.append('user_email', emailValue);
    
          const file = {
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          };
    
          data.append('avatar_file', file);
    
          // Add fetch request here to send data to the backend
        }  
      });
    };

    return (
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderDrawerContent={() => {
          return <Text>Drawer content</Text>;
        }}
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
                  source={require('../assets/avatar2.avif')}
                  style={styles.avatar}
              ></Image>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible}>
              <View style={styles.modalContent}>
                <Image
                  source={require('../assets/avatar2.avif')}
                  style={styles.enlargedAvatar}
                />
                <TouchableOpacity onPress={fetchUserInfo}>
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
    color: 'blue',
  },
});