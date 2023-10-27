import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle the response data here
        if (data.detail) {
          console.error('Error:', data.detail); // Log the error if there is one
        } else {
          navigation.navigate('Homepage'); // Navigate to the login screen
          console.clear();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  return (
        <View style={styles.container}>
            <Text style={styles.login}> Log in </Text>

            <Text style={styles.secondLine}> Sign in with your data that you entered during your registration</Text>

            <Text style={styles.name}> Email </Text>
            <TextInput style={styles.input}
            placeholder='name@example.com'
            keyboardType='web-search'
            keyboardAppearance='default'
            maxLength={40}
            onChangeText={text => setEmail(text)}
            value={email}
            ></TextInput>

            <Text style={styles.name}> Password </Text>
            <TextInput style={styles.input}
            placeholder='min. 8 characters'
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
            
            <Image source={require('../assets/Rectangle4.png')} style={styles.signInBackground} />
            <TouchableOpacity onPress={userLogin}>
                <Text style={styles.logIn}> Log in </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('SignUp')}> 
                <Text style={styles.bottomText1}> Don't have an account? <Text style={styles.boldText}>Sign up</Text></Text>
            </TouchableOpacity>
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
    marginTop: 20,
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
    bottom: -180,
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