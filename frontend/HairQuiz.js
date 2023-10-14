import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, Button, Modal, TouchableOpacity, Pressable } from 'react-native';

export default function HairQuiz({ navigation }) {

    const [confirmation, setConfirmation] = useState(false);

    const onPressHandler = () => {
        if (confirmation === true){
            navigation.navigate('HairQuizQuestion');
        }
        else{
          Alert.alert('Warning', 'If you take the hairquiz, you must acknowledge our terms and agreement',[
                        {text:'OK'}
                    ])
        }
      }

    const onPressHandler2 = () => {
      Alert.alert('Warning', 'please view our app agreement carefully',[
        {
          text:'Disagree',
          onPress: () => {
            console.warn('user declined');
            setConfirmation(false);
          }
        },
        {
          text:'Agree',
          onPress: () => {
            console.warn('user agreed');
            setConfirmation(true);
          }
        }
      ])
    }
    // const onPressHandler = () => {
    //     // navigation.navigate('HomePage');
    //     // navigation.navigate('HairQuizQuestion');
    //     if (confirmation === false){
    //         Alert.alert('Warning', 'If you take the hairquiz, you must acknowledge our terms and agreement',[
    //             {text:'OK'}
    //         ])
    //     }
    //     else{
    //         navigation.navigate('HairQuizQuestion');
    //     }
    // } 
      
    return(
      <View>
          <Pressable
            onPress={onPressHandler}
          >
            <Text style={styles.crownText}>
                Hair Quiz
            </Text>
            <Image
                source={require('./assets/Rectangle4.png')}
                style={styles.rectangle1}
            ></Image>

          </Pressable>

          <Pressable 
            onPress={onPressHandler2}
          >
            <Text style={styles.agreement}>
                Agreement 
            </Text>
            <Image 
                source={require('./assets/Rectangle4.png')}
                style={styles.rectangle2}
            ></Image>
          </Pressable>
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
      top: 30,
    },
    rectangle1: {
        backgroundColor: `rgba(217, 217, 217, 1)`,
        width: 320,
        height: 330,
        position: 'absolute',
        left: 33,
        top: 88,
    },
    agreement: {
      textAlign: 'left',
      fontWeight: '500',
      fontSize: 20,
      color: 'black',
      left: 33,
      top: 410,
    },
    rectangle2: {
        backgroundColor: `rgba(217, 217, 217, 1)`,
        width: 320,
        height: 149,
        position: 'absolute',
        left: 33,
        top: 450,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    pressableButton: {
        padding: 20,
        backgroundColor: 'lightblue',
        borderRadius: 10,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
      },
  });