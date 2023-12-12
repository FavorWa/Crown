import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const BottomBar = ({ navigation }) => {
  
  
  const selectableImages = {
    'avatar1': require('../assets/avatar1.png'),
    'avatar2': require('../assets/avatar2.png'),
    'avatar3': require('../assets/avatar3.png'),
    'avatar4': require('../assets/avatar4.png'),
    'avatar5': require('../assets/avatar5.png'),
    'avatar6': require('../assets/avatar6.png'),
    'avatar7': require('../assets/avatar7.png'),
    'avatar8': require('../assets/avatar8.png')
  };
  const isLoggedIn = async (web) => {
    try {
      const login = await AsyncStorage.getItem('LoginStatus');
      if (login !== 'true') {
        navigation.replace('Login');
      } else {
        navigation.replace(web);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  const [userAvatar, setUserAvatar] = useState(null);
  const fetchUserAvatar = async () => {
    const loginStatus = await AsyncStorage.getItem('LoginStatus');
    if (loginStatus === 'true') {
      const avatar = await AsyncStorage.getItem('userAvatar');
      setUserAvatar(avatar);
    }
  };

  useEffect(() => {
    fetchUserAvatar();
  }, []);

  return (
        <View style={styles.Bottonline}> 
            <TouchableOpacity onPress={() => navigation.replace('Homepage')}>
            <Image
              source={require('../assets/Compass.png')}
              style={styles.Compass}
            ></Image>
            <Text style={styles.Compassword}>Discover</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => isLoggedIn('Stylist')}>
            <Image
              source={require('../assets/Barbershop.png')}
              style={styles.Barbershop}
            ></Image>
            <Text style={styles.Barbershopword}>Stylist</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => isLoggedIn('User')}>
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
  );
};

const styles = StyleSheet.create({
  Compass: {
    aspectRatio: 1.2,
    marginLeft: '21%',
    marginTop: 15,
  },
  Compassword: {
    marginLeft: '20%',
  },
  Barbershop: {
    aspectRatio: 1.2,
    marginLeft: '46%',
    marginTop: -55,
  },
  Barbershopword: {
    marginLeft: '47%',
    marginBottom: -40,
  },
  User: {
    marginLeft: '70%',
    marginTop: -55,
    aspectRatio: 1.2,
  },
  Userword: {
    marginLeft: '71%',
    marginBottom: -40,
  },

  Bottonline: {
    width: '100%',
    height: 90,
    flexShrink: 0,
    borderRadius: 39,
    borderWidth: 1,
    borderColor: '#472415',
    marginHorizontal: 0,
    backgroundColor:"white",
    position:'absolute',
    bottom: 0,
    flexDirection:'column',
    flexGrow: 1,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 40,
    marginLeft: '70%',
    marginVertical: -55,
  },
});

export default BottomBar;