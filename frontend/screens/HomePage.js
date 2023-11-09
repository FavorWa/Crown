import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectableImages } from './User';

export default function Homepage({ navigation }) {

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
      console.log('user logged in');
      console.log(await AsyncStorage.getItem('userAvatar'));
      console.log(await AsyncStorage.getItem('userEmail'));
      console.log(await AsyncStorage.getItem('userId'));
      console.log(await AsyncStorage.getItem('userPassword'));
    }
    else{
      console.log('user didn\'t log in');
      console.log(await AsyncStorage.getItem('userAvatar'));
      console.log(await AsyncStorage.getItem('userEmail'));
      console.log(await AsyncStorage.getItem('userId'));
      console.log(await AsyncStorage.getItem('userPassword'));
    }
  };

  useEffect(() => {
    fetchUserAvatar();
  }, []);

  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.hairquiz}>
        Hair Quiz
      </Text>
      <Image
        source={require('../assets/Rectangle4.png')}
        style={styles.rectangle4}
      ></Image>

      <TouchableOpacity onPress={() => navigation.navigate('HairQuiz')}>
        <Image
          source={require('../assets/Rectangle4.png')}
          style={styles.hairQuizRectangle}
        ></Image>
        <Text style={styles.takeTheQuiz}>
          Take the Quiz
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Blogs')}>
        <Text style={styles.blogs}>
          Blogs
        </Text>
      </TouchableOpacity>
      
      <View style={styles.blogScrollContainer}>
        <ScrollView horizontal={true} >
          <Image
            source={require('../assets/blogM1.png')}
            style={styles.scrollObject}
          ></Image>
          <Image
            source={require('../assets/blogM2.png')}
            style={styles.scrollObject}
          ></Image>
          <Image
            source={require('../assets/blogM3.png')}
            style={styles.scrollObject}
          ></Image>
          <Image
            source={require('../assets/Rectangle4.png')}
            style={styles.scrollObject}
          ></Image>
          <Image
            source={require('../assets/Rectangle4.png')}
            style={styles.scrollObject}
          ></Image>
          <Image
            source={require('../assets/Rectangle4.png')}
            style={styles.scrollObject}
          ></Image>
        </ScrollView>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ProductsPage')}>
        <Text style={styles.productPage}> Products </Text>
      </TouchableOpacity>
      
      <TouchableOpacity>
        <Text style={styles.Inspiration}>
          Inspiration
        </Text>
      </TouchableOpacity>

      <View style={styles.InspirationScrollContainer}>
        <ScrollView horizontal={true} >
          <Image
            source={require('../assets/Rectangle4.png')}
            style={styles.scrollObject}
          ></Image>
          <Image
            source={require('../assets/Rectangle4.png')}
            style={styles.scrollObject}
          ></Image>
          <Image
            source={require('../assets/Rectangle4.png')}
            style={styles.scrollObject}
          ></Image>
          <Image
            source={require('../assets/Rectangle4.png')}
            style={styles.scrollObject}
          ></Image>
          <Image
            source={require('../assets/Rectangle4.png')}
            style={styles.scrollObject}
          ></Image>
          <Image
            source={require('../assets/Rectangle4.png')}
            style={styles.scrollObject}
          ></Image>
        </ScrollView>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Image
              source={require('../assets/Community.png')}
              style={styles.Community}
            ></Image>
            <Text style={styles.Communityword}>Community</Text>
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
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
  },
  hairquiz: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    left: 28,
    top: 5,
  },
  takeTheQuiz: {
    textAlign: 'center', // Center the text horizontally within the container
    lineHeight: 24, // Set the line height to match the height of the container
    fontWeight: '400', // Use 'bold' instead of 400 for a bolder font weight
    fontSize: 18,
    width: 110,
    height: 24,
    marginLeft: 260,
    marginTop: 150,
  },
  hairQuizRectangle: {
    tintColor: '#C9A227',
    width: 130,
    height: 24,
    borderRadius: 12, 
    left: 250,
    top: 175,
  },
  rectangle4: {
    backgroundColor: 'rgba(217, 217, 217, 1)',
    width: 355,
    height: 150,
    borderRadius: 20,
    position: 'absolute',
    left: 28,
    top: 40,
  },
  blogs: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    left: 33,
  },
  productPage: {
    backgroundColor: '#add8e6',
    width: 100,
    height: 30,
    fontSize: 24,
    left: 280,
    marginTop: 30,
  },
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
  blogScrollContainer:{
    top: 15,
    height: 160,
    marginHorizontal: 28,
  },
  scrollObject: {
    height: 160,
    width: 120,
    borderRadius: 15,
    marginRight: 10,
  },
  Inspiration: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    left: 33,
  },
  InspirationScrollContainer:{
    top: 15,
    height: 160,
    marginHorizontal: 28,
  },
});