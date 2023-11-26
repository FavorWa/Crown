import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Drawer } from 'react-native-drawer-layout';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';


export const selectableImages = {
  'avatar1': require('../assets/avatar1.png'),
  'avatar2': require('../assets/avatar2.png'),
  'avatar3': require('../assets/avatar3.png'),
  'avatar4': require('../assets/avatar4.png'),
  'avatar5': require('../assets/avatar5.png'),
  'avatar6': require('../assets/avatar6.png'),
  'avatar7': require('../assets/avatar7.png'),
  'avatar8': require('../assets/avatar8.png')
};
const Nums = [
  'avatar1',
  'avatar2',
  'avatar3',
  'avatar4',
  'avatar5',
  'avatar6',
  'avatar7',
  'avatar8'
];

export default function DrawerExample({ navigation }) {
    const [userName, setuserName] = useState('');
    const [userId, setuserId] = useState('');

    const [open, setOpen] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    
    const [userAvatar, setUserAvatar] = useState(null);
    const [isStylist, setisStylist] = useState(false);
    useEffect(() => {
      const fetchUserAvatar = async () => {
        const avatarUrl = await AsyncStorage.getItem('userAvatar').catch(error => {
          console.error('Error fetching user avatar:', error);
        });
        if (avatarUrl) {
          setUserAvatar(await AsyncStorage.getItem('userAvatar'));
          setuserName(await AsyncStorage.getItem('userName'));
          setuserId(await AsyncStorage.getItem('userId'));
          setisStylist(await AsyncStorage.getItem('userIdentity'))
        }
      };
  
      fetchUserAvatar();
    }, []);


    const changeAvatar = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      console.log(email);
      const randomNum = Math.floor(Math.random() * 8);
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

    const logout = async () => {
      await AsyncStorage.setItem('userAvatar', '');
      await AsyncStorage.setItem('userName', '');
      await AsyncStorage.setItem('userId', '');
      await AsyncStorage.setItem('userEmail', '');
      await AsyncStorage.setItem('userPassword', '');
      await AsyncStorage.setItem('userHairType', '');
      await AsyncStorage.setItem('keepLogIn', 'false');
      await AsyncStorage.setItem('LoginStatus', 'false'); 
      console.log('log out');
      setOpen(false);
      navigation.replace('Cover');
    };

    return (
      <Drawer
        drawerPosition='right'
        drawerStyle={{ right: 0 }}
        drawerType='front'
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderDrawerContent={() => (
          <View style={{ top: 35 }}>
            <Text style={{ fontSize: 32, top: 5, left: 20, marginVertical: 20 }}> Settings </Text>
            <TouchableOpacity> 
              <Image
                    source={require('../assets/saved.png')}
                    style={{marginTop: 40, width: 20, height: 20, left: 20,}}
              ></Image>
              <Text style={{left: 50, fontSize: 20, top: -25}}> Saved </Text>
              <View style={{ flex: 1, height: 1, marginLeft: 45, top: -15, borderWidth: 0.5, borderColor: '#713200', marginRight: 30, }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('Friends')}> 
              <Image
                    source={require('../assets/friends.png')}
                    style={{marginTop: 10, width: 20, height: 20, left: 20,}}
              ></Image>
              <Text style={{left: 50, fontSize: 20, top: -25}}> Friends </Text>
              <View style={{ flex: 1, height: 1, marginLeft: 45, top: -15, borderWidth: 0.5, borderColor: '#713200', marginRight: 30, }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('ResetFilter')}> 
              <Image
                    source={require('../assets/reset.png')}
                    style={{marginTop: 10, width: 20, height: 20, left: 20,}}
              ></Image>
              <Text style={{left: 50, fontSize: 20, top: -25}}> Reset Filter </Text>
              <View style={{ flex: 1, height: 1, marginLeft: 45, top: -15, borderWidth: 0.5, borderColor: '#713200', marginRight: 30, }} />
            </TouchableOpacity>

            <TouchableOpacity> 
              <Image
                    source={require('../assets/privacy.png')}
                    style={{marginTop: 10, width: 20, height: 20, left: 20,}}
              ></Image>
              <Text style={{left: 50, fontSize: 20, top: -25}}> Privacy </Text>
              <View style={{ flex: 1, height: 1, marginLeft: 45, top: -15, borderWidth: 0.5, borderColor: '#713200', marginRight: 30, }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('Settings')}> 
              <Image
                    source={require('../assets/Settings.png')}
                    style={{marginTop: 10, width: 20, height: 20, left: 20,}}
              ></Image>
              <Text style={{left: 50, fontSize: 20, top: -25}}> Settings </Text>
              <View style={{ flex: 1, height: 1, marginLeft: 45, top: -15, borderWidth: 0.5, borderColor: '#713200', marginRight: 30, }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={logout}>
              <Image
                    source={require('../assets/logout.png')}
                    style={{marginTop: 10, width: 20, height: 20, left: 20,}}
              ></Image>
              <Text style={{ color: '#A02000', left: 50, fontSize: 18, top: -22 }}> Log Out </Text>
            </TouchableOpacity>
          </View>
        )}
      >
          <ScrollView>
              {isStylist ? (
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate('UserStylist')}>
                    <Text style={{ fontSize: 34, fontWeight: '500', left: 33, top: 60, color:'#d32e05'}}>Stylist</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', left: 33, top: 70, color: '#713200'}}>Master skill, time to show</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text style={{ fontSize: 34, fontWeight: '500', left: 33, top: 60}}>Profile</Text>
                  <Text style={{ fontSize: 14, fontWeight: '500', left: 33, top: 70, color: '#713200'}}>All the details, catered to you.</Text>
                </View>
              )}
              
              
              
              <View style={{ top: -50, width: 70 }}>
                <TouchableOpacity onPress={() => setOpen((prevOpen) => !prevOpen)} >
                  <Image
                      source={require('../assets/content_list.png')}
                      style={styles.Contentlist}
                  ></Image>
                </TouchableOpacity>
              </View>

              <Image
                  source={require('../assets/profile_page.png')}
                  style={{ alignSelf: 'center', height: 150, top: 10}}
              ></Image>

              <TouchableOpacity>
                <View style={{ top: 20, backgroundColor: '#C9A227', borderRadius: 15, alignItems: 'center', height: 30, marginHorizontal: 5, width: 170, left: 200 }}>
                  <Text style={{ top: 2, fontSize: 20 }}> See Your Results </Text>
                </View>
              </TouchableOpacity>

              <Text style={{ fontSize: 24, left: 30, top: 40}}>Set Your Hair Goals</Text>

              <View style={{ top: 50, backgroundColor: '#EDE0D4', borderRadius: 20, height: 70, marginHorizontal: 30, }}>
                <TouchableOpacity>
                  <Image
                      source={require('../assets/Plus.png')}
                      style={{top: 20, left: 10, height: 30, width: 30}}
                  ></Image>
                </TouchableOpacity>
              </View>

              <View style={{ top: 60, backgroundColor: '#EDE0D4', borderRadius: 20, height: 70, marginHorizontal: 30, }}>
                <TouchableOpacity>
                  <Image
                      source={require('../assets/Plus.png')}
                      style={{top: 20, left: 10, height: 30, width: 30}}
                  ></Image>
                </TouchableOpacity>
              </View>

              <View style={{ top: 70, backgroundColor: '#EDE0D4', borderRadius: 20, height: 70, marginHorizontal: 30, }}>
                <TouchableOpacity>
                  <Image
                      source={require('../assets/Plus.png')}
                      style={{top: 20, left: 10, height: 30, width: 30}}
                  ></Image>
                </TouchableOpacity>
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

              <Text style={{fontSize: 24, left: 230, top: 80}}>Notifications</Text>
              <ScrollView style={{ top: 90, left: 200 }}>
                <View style={{ backgroundColor: '#E3A387', borderRadius: 20, alignItems: 'center', marginHorizontal: 5, marginBottom: 10, width: 180 }}>
                  <Text style={{ marginVertical: 8, fontSize: 12, marginHorizontal: 5 }}>You have an upcoming appointment with Chantelle on Nov. 6</Text>
                </View>
                <View style={{ backgroundColor: '#E3A387', borderRadius: 20, alignItems: 'center', marginHorizontal: 5, marginBottom: 10, width: 180 }}>
                  <Text style={{ marginVertical: 8, fontSize: 12, marginHorizontal: 5 }}>Sara M. wants to share their hair journey with you!</Text>
                </View>
                <View style={{ backgroundColor: '#E3A387', borderRadius: 20, alignItems: 'center', marginHorizontal: 5, marginBottom: 10, width: 180 }}>
                  <Text style={{ marginVertical: 8, fontSize: 12, marginHorizontal: 5 }}>Set your hair goals for this month.</Text>
                </View>
              </ScrollView>

              <View style={{width: 150, height: 200, top: -90, left: 33}}>
                <Image  
                    source={require('../assets/Rectangle4.png')}
                    style={{ borderRadius: 20, width: 150, height: 200, tintColor: '#E9B8A9' }}
                ></Image>
                <Text style={{ top: -190, fontSize: 20, }}> November </Text>
                <TouchableOpacity>
                  <Image  
                      source={require('../assets/leftArrow.png')}
                      style={{ left: 110,top: -205, width: 10, height: 10 }}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image  
                      source={require('../assets/rightArrow.png')}
                      style={{ left: 130,top: -215, width: 10, height: 10 }}
                  ></Image>
                </TouchableOpacity>
              </View>
              {/* <Text style={styles.username}> {userName} </Text>

              <Text style={styles.userId}> {userId} </Text> */}
          </ScrollView>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: 10 }}>
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

                <TouchableOpacity onPress={() => navigation.replace('Friends')}>
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
      </Drawer>
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
});