import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';

export default function HairQuizQuestion({ navigation }) {
    const onPressHandler = () => {
      // navigation.navigate('HomePage');
      navigation.goBack();
    }
  
    return(
        <View>
          <Text style={styles.crownText}>
            Hair Quiz
          </Text>
          <Text numberOfLines={2} style={styles.question}>
            Which most closely resembles your hair type?
          </Text>
          <Image 
            source={require('./assets/Rectangle4.png')}
            style={styles.rectangle1}
          ></Image>

          <Image 
            source={require('./assets/Rectangle4.png')}
            style={styles.rectangle2}
          ></Image>
          <Text style={styles.Answer}>
            A. Coily
          </Text>
          <Image 
            source={require('./assets/Rectangle4.png')}
            style={styles.rectangle3}
          ></Image>
          <Image 
            source={require('./assets/Rectangle4.png')}
            style={styles.rectangle4}
          ></Image>
        </View>
    )
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
      textAlign: 'left',
      fontWeight: '500',
      fontSize: 48,
      color: 'black',
      left: 33,
      top: 20,
    },
    question: {
      // textAlign: 'left',
      // fontWeight: '500',
      // fontSize: 18,
      // color: 'black',
      // left: 33,
      // top: 40,
      textAlign: 'left',
      fontWeight: '500',
      fontSize: 18,
      color: 'black',
      width: '80%', // Set a specific width to limit the text to a certain width
      left: 33,
      top: 40,
    },
    rectangle1: {
        backgroundColor: `rgba(217, 217, 217, 1)`,
        width: 305,
        height: 151,
        position: 'absolute',
        left: 33,
        top: 145,
    },
    Answer: {
      textAlign: 'left',
      fontWeight: '500',
      fontSize: 18,
      color: 'black',
      left: 48,
      top: 242,
    },
    rectangle2: {
        backgroundColor: `rgba(217, 217, 217, 1)`,
        width: 91,
        height: 84,
        position: 'absolute',
        left: 37,
        top: 310,
    },
    rectangle3: {
      backgroundColor: `rgba(217, 217, 217, 1)`,
      width: 91,
      height: 84,
      position: 'absolute',
      left: 142,
      top: 310,
    },
    rectangle4: {
      backgroundColor: `rgba(217, 217, 217, 1)`,
      width: 91,
      height: 84,
      position: 'absolute',
      left: 250,
      top: 310,
    },
  });