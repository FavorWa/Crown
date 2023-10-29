import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function User({ navigation }) {

  
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