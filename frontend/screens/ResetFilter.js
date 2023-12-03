import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectableImages } from './User';


export default function ResetFilter({ navigation }) {

  const [userAvatar, setUserAvatar] = useState(null);
  const fetchUserAvatar = async () => {
      const avatar = await AsyncStorage.getItem('userAvatar');
      setUserAvatar(avatar);
  };

  useEffect(() => {
    fetchUserAvatar();
  }, []);
  
  return (
        <SafeAreaView style={styles.container}>
          
            <View>
                <TouchableOpacity onPress={() => navigation.replace('User')}>
                    <Image
                        source={require('../assets/gobackIcon.png')}
                        style={{marginTop: 10, width: 40, height: 40, left: 20 }}
                    ></Image>
                </TouchableOpacity>
            </View>

            <Text style={{ left: 80, fontSize: 40, fontWeight: '400', top: -45}}> Reset Filter </Text>
        
            <Text style={{ marginHorizontal: 20 }}> You can reset the onboarding filter you first took upon downloading Crown to receive a new set of 
                recommended content. You will NOT be able to retrieve your past recommended data. 
                Only proceed once you are sure.</Text>

            <TouchableOpacity>
                <Text style={{ color: '#713200', fontSize: 30, fontWeight: '500', top: 40, left: 20}}> Reset Filter </Text>
            </TouchableOpacity>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: 235 }}>
                <View style={styles.Bottonline}> 
                    <TouchableOpacity onPress={() => navigation.replace('Homepage')}>
                    <Image
                    source={require('../assets/Compass.png')}
                    style={styles.Compass}
                    ></Image>
                    <Text style={styles.Compassword}>Discover</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('Stylist')}>
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
                    {userAvatar ? (
                    <Image source={selectableImages[userAvatar]} style={styles.avatar} />
                    ) : (
                    <>
                        <Image source={require('../assets/User.png')} style={styles.User} />
                        <Text style={styles.Userword}>Profile</Text>
                    </>
                    )}
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
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
    marginBottom: -210,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 40,
    marginLeft: 330,
    marginVertical: -55,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  findastylist: {
    fontSize: 35,
    width: 246,
    height: 40,
    top: 10,
    left: 23,
  },
});