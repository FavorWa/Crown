import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, ImageBackground, TouchableOpacity, Pressable, Image, Text } from 'react-native';
import { useEffect } from 'react';
import {  } from 'react-native-paper';
import Logo from '../assets/CrownLogo.png'

function Cover({ navigation }) {
  // const [LoginStatus, setLoginStatus] = useState(false);
  // const _retriveData = async() => {
  //   try{
  //     const data = await AsyncStorage.getItem("keepLogIn");
  //     if (data === 'true'){
  //       await AsyncStorage.setItem('isLoggedIn', 'true');
  //     }else{
  //     }
  //   }catch (errer) {
  //     console.log('error', error);
  //   }
  // };

  // useEffect(() => {
  //   _retriveData();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Homepage');
    }, 3000);
        return () => clearTimeout(timeout);
  }, [navigation]);

  
  return (
    
        <View style={styles.container}>
            <Image
              source={Logo}
              style={styles.new_cover}
            />
            <Text style={styles.crownText}>Crown</Text>
            <Text style={styles.tagText}>The all-in-one resource for textured for</Text>
            <Text style={styles.tagText}>textured hair care improvement</Text>
        </View>
    );
}

export default Cover;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(237, 224, 212, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  new_cover: {
    width: '60%', 
  },
  crownText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 80,
    color: 'black',
    padding: 0,
    lineHeight: 80
  },

  tagText: {
    fontSize: 20
  }
});