import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity} from 'react-native';

export default function SignUp({ navigation }) {

  return (
        <View style={styles.container}>
            <Text style={styles.signup}> Sign Up </Text>

            <Text style={styles.name}> Name </Text>
            <TextInput style={styles.input} 
            placeholder='e.g. John'
            keyboardType='web-search'
            keyboardAppearance='default'
            maxLength={20}
            ></TextInput>

            <Text style={styles.name}> Email </Text>
            <TextInput style={styles.input}
            placeholder='name@example.com'
            keyboardType='web-search'
            keyboardAppearance='default'
            maxLength={40}
            ></TextInput>

            <Text style={styles.name}> Password </Text>
            <TextInput style={styles.input}
            placeholder='min. 8 characters'
            keyboardType='web-search'
            keyboardAppearance='default'
            maxLength={40}
            secureTextEntry
            ></TextInput>

            <Text style={styles.name}> Confirm Password </Text>
            <TextInput style={styles.input}
            placeholder='min. 8 characters'
            keyboardType='web-search'
            keyboardAppearance='default'
            maxLength={40}
            secureTextEntry
            ></TextInput>

            
            <Image source={require('./assets/Rectangle4.png')} style={styles.signInBackground} />
            <TouchableOpacity>    
                <Text style={styles.signIn}> Sign In </Text>
            </TouchableOpacity>

            <Text style={styles.bottomText1}> Have an account? <Text style={styles.boldText}>Login</Text></Text>
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