import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cover from './screens/Cover.js';
import Homepage from './screens/HomePage';
import Result from './screens/Result.js';
import HairQuizQuestion from './screens/HairQuizQuestion'; 
import SignUp from './screens/Signup';
import Login from './screens/Login';
import ProductsPage from './screens/ProductsPage';
import Blogs from './screens/Blogs';
import User from './screens/User';
import Friends from './screens/Friends';
import Settings from './screens/Settings';
import Stylist from './screens/Stylist';
import StylistProfile from './screens/StylistProfile';
import ResetFilter from './screens/ResetFilter';
import Article from './screens/Article'
import InHouseStylists from './screens/InHouseStylists.js';
import UserStylist from './screens/UserStylist';


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
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide the header for all screens
        }}
      >

      <Stack.Screen 
          name="Cover" 
          component={Cover}
        />
        <Stack.Screen 
          name="Homepage" 
          component={Homepage}
        />
        <Stack.Screen 
          name="Result" 
          component={Result}
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

        <Stack.Screen
          name="Article"
          component={Article}
        />

        <Stack.Screen
          name="Stylist"
          component={Stylist}
        />

        <Stack.Screen
          name="Friends"
          component={Friends}
        />

        <Stack.Screen
          name="Settings"
          component={Settings}
        />

        <Stack.Screen
          name="StylistProfile"
          component={StylistProfile}
        />

        <Stack.Screen
          name="InHouseStylists"
          component={InHouseStylists}
        />

        <Stack.Screen
          name="ResetFilter"
          component={ResetFilter}
        />

        <Stack.Screen
          name="UserStylist"
          component={UserStylist}
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
