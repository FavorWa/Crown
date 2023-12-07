import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Pressable } from 'react-native';

export default function Cover({ navigation }) {
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
  return (
        <SafeAreaView style={styles.container}>

          <TouchableOpacity onPress={() => navigation.replace('Homepage')}>
            <Image 
              source={require('../assets/CrownLogo.png')} 
              style={{alignSelf: 'center'}} 
            />
            <Image 
              source={require('../assets/CrownWord.png')} 
              style={{height: 80, width: 400}} 
            />
            <Image 
              source={require('../assets/CoverText.png')} 
              style={{height: 60, width: 250, alignSelf: 'center'}} 
            />
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signup}>SignUp/Login</Text>
          </TouchableOpacity> */}
    
          {/* {!LoginStatus && (
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signup}>SignUp/Login</Text>
            </TouchableOpacity>
          )} */}


          {/* <StatusBar style="auto" /> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(237, 224, 212, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  new_cover: {
    flex: 0,
    width: '100%', 
    aspectRatio: 1.2, 
    resizeMode: 'cover',
    marginLeft: 20,
    marginRight: 20,
  },
  crownText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 48,
    color: 'black',
  },
  crownTextMargin: {
    marginTop: -200,
  },
  signup: {
    margin: 40,
    color: 'black',
  },
});