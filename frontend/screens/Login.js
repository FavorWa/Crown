import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from the correct package
import { BACKEND_BASE_ANDROID, BACKEND_BASE_IOS } from '../secrets';
import { ScrollView } from 'react-native-gesture-handler';


export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const toggleKeepSignIn = () => {
    setKeepLoggedIn(!keepLoggedIn);
  };

  const userLogin = () => {

    fetch('http://localhost:8000/log_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        keepLoggedIn: keepLoggedIn, // Add keep_log_in field to the request body
      })
    })
      .then(response => response.json())
      .then(async data => {
        if (data.detail) {
          console.error('Error:', data.detail); // Log the error if there is one
        } else {
          await AsyncStorage.setItem('userEmail', email);
          await AsyncStorage.setItem('userPassword', password);
          await AsyncStorage.setItem('LoginStatus', 'true');
          if (keepLoggedIn == true){
            await AsyncStorage.setItem('keepLogIn', 'true');
          }else{
            await AsyncStorage.setItem('keepLogIn', 'false');
          }
          const userString = JSON.stringify(data.user);
          const userObject = JSON.parse(userString);
          await AsyncStorage.setItem('userId', userObject._id);
          await AsyncStorage.setItem('userName', userObject.name);
          await AsyncStorage.setItem('userAvatar', userObject.avatarNumber);
          await AsyncStorage.setItem('userHairType', userObject.hairType);
          await AsyncStorage.setItem('userIdentity', userObject.isStylist);
          await AsyncStorage.setItem('userEmail', userObject.email);
          await AsyncStorage.setItem('userPassword', userObject.password);
          navigation.replace('Homepage'); // Navigate to the login screen
          console.clear();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  return (
        <View style={styles.container}>
          <ScrollView>
            <TouchableOpacity onPress={() => navigation.replace('Homepage')}>
              <Image source={require('../assets/gobackIcon.png')} style={{ left: 20, top: 40, height: 40, width: 40}} />
            </TouchableOpacity>
            <Image source={require('../assets/LoginImage.png')} style={{width: 200, height: 80, top: 60, left: 33, marginBottom: 60}} />

            <Text style={styles.secondLine}> Sign in with your data that you entered during your registration</Text>

            <Text style={styles.name}> Email </Text>
            <TextInput style={styles.input}
            placeholder=' Email'
            keyboardType='web-search'
            keyboardAppearance='default'
            maxLength={40}
            onChangeText={text => setEmail(text)}
            value={email}
            ></TextInput>

            <Text style={styles.name}> Password </Text>
            <TextInput style={styles.input}
            placeholder=' Password'
            keyboardType='web-search'
            keyboardAppearance='default'
            maxLength={40}
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
            ></TextInput>

            <Text style={styles.forgetPassword}> Forget Password </Text>

            <View style={styles.rowContainer}>
                <TouchableOpacity onPress={toggleKeepSignIn} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>{keepLoggedIn ? '✔️' : '◻️'}</Text>
                </TouchableOpacity>
                <Text style={styles.keepsignin}> Keep me logged in </Text>
            </View>
            
            <TouchableOpacity onPress={userLogin}>
              <Image source={require('../assets/SignInImage.png')} style={{ height: 50, width: 220, alignSelf: 'center', top: 80 }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('SignUp')}> 
                <Text style={styles.bottomText1}> Don't have an account? <Text style={styles.boldText}>Sign up</Text></Text>
            </TouchableOpacity>
          </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE0D4',
  },
  login: {
    color: 'black',
    fontSize: 60,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.1,
    marginTop: 50,
    marginLeft: 30,
  },
  secondLine: {
    color: 'black',
    fontSize: 18,
    marginTop: 20,
    width: 428,
    paddingHorizontal: 35, // Add this line
  },
  name: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.1,
    marginTop: 25,
    marginLeft: 40,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    width: 330,
    height: 40,
    alignSelf: 'center',
    borderColor: '#472415',
    borderRadius: 5,
    fontSize: 20,
  },
  forgetPassword: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.1,
    marginTop: 25,
    marginLeft: 40,
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row', // Align children components horizontally
    alignItems: 'center', // Center align vertically within the container
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    padding: 1,
    borderRadius: 5,
    marginLeft: 30,
  },
  keepsignin:{
    color: 'black',
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: 0.1,
  },
  logIn: {
    color: 'black',
    fontSize: 40,
    fontWeight: '400',
    letterSpacing: 0.2,
    marginTop: 80,
    alignSelf: 'center'
  },
  signInBackground: {
    width: 204,
    height: 50,
    tintColor: '#C9A227',
    borderRadius: 5,
    marginTop: 510,
    alignSelf: 'center',
    position: 'absolute',
  },
  bottomText1: {
    color: 'black',
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: 0.1,
    top: 280,
    alignSelf: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    letterSpacing: 0.1,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});