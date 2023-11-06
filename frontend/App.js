import React, { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cover from './screens/Cover.js';
import Homepage from './screens/HomePage';
import HairQuiz from './screens/HairQuiz';
import HairQuizQuestion from './screens/HairQuizQuestion'; 
import SignUp from './screens/Signup';
import Login from './screens/Login';
import ProductsPage from './screens/ProductsPage';
import Blogs from './screens/Blogs';
import User from './screens/User';

const Stack = createStackNavigator();

export default function App() {

  const _retriveData = async() => {
    try{
      const data = await AsyncStorage.getItem("keepLogIn");
      if (data === 'true'){
        await AsyncStorage.setItem('isLoggedIn', 'true');
      }else{
        await AsyncStorage.setItem('userEmail', '');
        await AsyncStorage.setItem('userPassword', '');
        await AsyncStorage.setItem('isLoggedIn', 'false');
        await AsyncStorage.setItem('LoginStatus', 'false');
        await AsyncStorage.setItem('userId', '');
        await AsyncStorage.setItem('userName', '');
        await AsyncStorage.setItem('userAvatar', '');
        await AsyncStorage.setItem('userHairType', '');
      }
    }catch (errer) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    _retriveData();

    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === 'background') {
        try {
          await AsyncStorage.removeItem('userEmail');
          await AsyncStorage.removeItem('userPassword');
          await AsyncStorage.setItem('isLoggedIn', 'false');
        } catch (error) {
          console.error('Error clearing login information:', error);
        }
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen 
          name="Cover" 
          component={Cover}
        />
        <Stack.Screen 
          name="Homepage" 
          component={Homepage}
        />
        <Stack.Screen 
          name="HairQuiz" 
          component={HairQuiz}
        />
        <Stack.Screen 
          name="HairQuizQuestion" 
          component={HairQuizQuestion}
        />
        <Stack.Screen
          name="SignUp" 
          component={SignUp}>
        </Stack.Screen>
        <Stack.Screen
          name="Login" 
          component={Login}>
        </Stack.Screen>

        <Stack.Screen 
          name="ProductsPage"
          component={ProductsPage}
        />

        <Stack.Screen
          name="Blogs"
          component={Blogs} 
        />

        <Stack.Screen
          name="User"
          component={User} 
        />
      </Stack.Navigator>
    </NavigationContainer>
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
  crownText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 48,
    color: 'black',
  },
  crownTextMargin: {
    marginTop: -200,
  },
});
