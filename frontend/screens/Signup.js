import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const [willbeStylist, setwillbeStylist] = useState(false);

  const toggleStylist = () => {
    setwillbeStylist(!willbeStylist);
  };

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
        password: password,
        isStylist: willbeStylist.toString(),
        hairType: "3A",
        avatarNumber: "avatar1"
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
            <TouchableOpacity onPress={() => navigation.replace('Homepage')}>
              <Image source={require('../assets/gobackIcon.png')} style={{ left: 20, top: 40, height: 40, width: 40}} />
            </TouchableOpacity>
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

            <View style={{ flexDirection: 'row', alignItems: 'center', top: 20, left: 20 }}>
                <TouchableOpacity onPress={toggleStylist} style={{ backgroundColor: '#EDE0D4', padding: 1, borderRadius: 5, marginLeft: 30 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30 }}>{willbeStylist ? '✔️' : '◻️'}</Text>
                </TouchableOpacity>
                <Text style={{ color: '#00000099' }}> Do you want to register as a stylist? </Text>
            </View>
              
            <View style={{ backgroundColor: '#C9A227', top: 50, width: 204, alignSelf: 'center', alignItems: 'center', height: 50, borderRadius: 15}}>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signIn}> Sign In </Text>
              </TouchableOpacity>
            </View>
            

            <View style={{ position: 'relative' }}>
                <TouchableOpacity style={{ position: 'absolute', left: 70, top: 80 }}>
                    <Image source={require('../assets/google.png')} style={{ height: 60, width: 60 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', left: 180, top: 80 }}>
                    <Image source={require('../assets/facebook.png')} style={{ height: 60, width: 60 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', left: 290, top: 80 }}>
                    <Image source={require('../assets/twitter.png')} style={{ height: 60, width: 60 }} />
                </TouchableOpacity>
            </View>


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
    marginTop: 40,
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
  },
  bottomText1: {
    color: 'black',
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: 0.1,
    top: 210,
    alignSelf: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    letterSpacing: 0.1,
  },
});