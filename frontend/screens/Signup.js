import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      console.error('Error: Password and confirm password do not match.');
      return;
    }

    fetch('http://localhost:8000/sign_up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
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
          navigation.navigate('Login'); // Navigate to the login screen
          console.clear();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
        <View style={styles.container}>
            <Text style={styles.signup}> Sign Up </Text>

            <Text style={styles.name}> Name </Text>
            <TextInput style={styles.input} 
            placeholder='e.g. John'
            keyboardType='web-search'
            keyboardAppearance='default'
            maxLength={20}
            onChangeText={text => setName(text)}
            value={name}
            ></TextInput>

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

            <Text style={styles.name}> Confirm Password </Text>
            <TextInput style={styles.input}
            placeholder='min. 8 characters'
            keyboardType='web-search'
            keyboardAppearance='default'
            maxLength={40}
            onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
            secureTextEntry
            ></TextInput>
              
            <Image source={require('../assets/Rectangle4.png')} style={styles.signInBackground} />
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signIn}> Sign In </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('Login')}>    
                <Text style={styles.bottomText1}> Have an account? <Text style={styles.boldText}>Login</Text></Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE0D4',
  },
  signup: {
    color: 'black',
    fontSize: 60,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.1,
    marginTop: 20,
    marginLeft: 30,
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
  signIn: {
    color: 'black',
    fontSize: 40,
    fontWeight: '400',
    letterSpacing: 0.2,
    marginTop: 50,
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
});