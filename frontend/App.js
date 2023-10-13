import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, Button } from 'react-native';
import HomePage from './HomePage.js';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('./assets/homepage_icon.png')}
        style={styles.backgroundImage}
      >
      </ImageBackground>
      <Button
        color="orange" 
        title="Continue" 
        onPress={() => console.log("Button tapped")}></Button>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%', // Use 100% of the width available
    height: '100%', // Use 100% of the height available
    resizeMode: 'cover', // Cover the entire container
    justifyContent: 'center',
    alignItems: 'center',
  },
});
