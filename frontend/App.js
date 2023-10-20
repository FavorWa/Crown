import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cover from './screens/Cover';
import HomePage from './screens/HomePage';
import HairQuiz from './screens/HairQuiz';
import HairQuizQuestion from './screens/HairQuizQuestion'; 
import Products from './screens/Products';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
          name="Cover" 
          component={Cover}
        />
        <Stack.Screen 
          name="HomePage" 
          component={HomePage}
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
          name="Products"
          component={Products}
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
