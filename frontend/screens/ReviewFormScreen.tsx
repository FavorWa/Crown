
import React, { useState } from 'react';
import { View, Button, StyleSheet, Pressable} from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import callApi from '../functions/callApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from 'react-native-ratings';

const ReviewFormScreen = ({ route, navigation }) => {
  const { _id } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [starsNum, setStarsNum] = useState('');

  const validateStarsNum = (text : String) => {
    var validatedText = text.replace(/[^0-9]/g, '');
    const integer = parseInt(validatedText)
    if (integer > 5) {
        validatedText = "5"
    }
    setStarsNum(validatedText)
  } 

  const handleFinishRating = (value: number) => {
    setStarsNum(value.toString());
  }

  const handleSubmit = async () => {
    const email = await AsyncStorage.getItem('userEmail');
    const reviewData = {
      reviewer: email,
      time: new Date().toISOString(),
      title,
      content,
      tags: tags.split(','),
      starsNum: parseInt(starsNum),
    };

    const reqObj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    };

    const res = await callApi(`/stylists/inhouse/${_id}/reviews`, reqObj);

    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        label="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.textInput}
        theme={{colors: {primary: "black"}}}
      />
    
      <TextInput
        label="Content"
        value={content}
        onChangeText={(text) => setContent(text)}
        multiline
        numberOfLines={4}
        style={styles.textInput}
        theme={{colors: {primary: "black"}}}
      />

      <TextInput
        label="Tags (comma-separated)"
        value={tags}
        onChangeText={(text) => setTags(text)}
        style={styles.textInput}
        theme={{colors: {primary: "black"}}}

      />

      <Text style={{marginTop: 16, fontSize: 28, textAlign: "center"}}>How many stars would you give this stylist?</Text>
      <AirbnbRating showRating={false} onFinishRating={handleFinishRating} size={60} selectedColor="#713200"/>

        <View style={styles.addReviewButtonContainer}>
            <Pressable style={styles.addReviewButton} onPress={handleSubmit}>
                <Text style={styles.addReviewText}>+ Add a review!</Text>
            </Pressable>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: "#EDE0D4",
        marginTop: 24,
        color: "black"
    },

    addReviewButtonContainer: {
        alignItems: "center"
    },

    addReviewButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderRadius: 16,
        borderColor: "#472415",
        borderWidth: 2,
        marginTop: 16,
        marginBottom: 16
      },

      addReviewText: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#472415',
      },
})
export default ReviewFormScreen;
