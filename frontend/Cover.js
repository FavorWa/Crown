import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Pressable } from 'react-native';

export default function Cover({ navigation }) {

  return (
        <SafeAreaView style={styles.container}>
          <ImageBackground
            source={require('./assets/Logo.png')}
            style={styles.backgroundImage}
          >
          </ImageBackground>
          
          <TouchableOpacity onPress={() => navigation.replace('HomePage')}>
              <Text style={[styles.crownText, styles.crownTextMargin]}>Crown</Text>
          </TouchableOpacity>
    
          <StatusBar style="auto" />
        </SafeAreaView>
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