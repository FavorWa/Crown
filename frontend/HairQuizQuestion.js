import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SectionList, TouchableOpacity, Pressable, Input } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



export default function HairQuizQuestion({ navigation }) {
  
  const onPressHandler = () => {
      // navigation.navigate('HomePage');
      navigation.goBack();
  }
  

  const data = [
    {
      key: '1',
      data: [
        {
          question: "Which most closely resembles your hair type?",
          description: "It's OK if it's not an exact match!",
          notSureText: 'NOT SURE?',
          images: [require('./assets/Rectangle4.png'), require('./assets/Rectangle4.png'), require('./assets/Rectangle4.png')],
          answers: ['Coily', 'Curly', 'Wavy']
        },
      ],
    },
    {
      key: '2',
      data: [
        {
          question: "How tightly wounded are your curls naturally?",
          description: "Ex.: Would you say you are on the tighter or wider side of wavy?",
          notSureText: 'NOT SURE?',
          images: [require('./assets/Rectangle4.png'), require('./assets/Rectangle4.png'), require('./assets/Rectangle4.png')],
          answers: ['Wide', 'Medium', 'Tight']
        },
      ],
    },
    {
      key: '3',
      data: [
        {
          question: "What's the thickness of your hair?",
          description: "Just the thickness of a single strand.",
          notSureText: 'NOT SURE?',
          images: [require('./assets/Rectangle4.png'), require('./assets/Rectangle4.png'), require('./assets/Rectangle4.png')],
          answers: ['Fine', 'Medium', 'Thick']
        },
      ],
    },
  ];
  
  
  
  return(
    <ScrollView>
      <Text style={styles.crownText}> Hair Characteristics </Text>
      <Text style={styles.secondLine}> Let's figure out what's right for you!</Text>
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.TextContainer}>
          <Text style={styles.textInsideContainer}>
            Our Hair Quiz is formulated to help you figure out your hair type and which products 
            and regimens may be best suited for you. Please be as honest as possible in your responses
            to ensure accurate results, if you're not sure, we can help you out!
          </Text>
          <Text style={styles.line}> {/* Line */} </Text>
          <TouchableOpacity>
            <Text style={styles.gotit}>
              Got It!
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <SectionList
        keyExtractor={(item) => item.key}
        sections={data}
        renderItem={({ item }) => {
          return(
            <View style={styles.QuestionBox}>
              <Text style={styles.text}>{item.question}</Text>
              <Text style={styles.miniText}>{item.description}</Text>
              <Text style={styles.Notsure}>{item.notSureText}</Text>
              <View style={styles.imageRow}>
                {item.images.map((image, index) => (
                  <Image key={index} source={image} style={styles.rectangle1} />
                ))}
              </View>
              <View style={{...styles.imageRow, marginTop: 25}}>
                {item.answers.map((answer, index) => (
                    <View key={index} style={styles.rectangleContainer}>
                      <Image source={require('./assets/Rectangle4.png')} style={styles.rectangle2} />
                      <Text style={styles.rectangleText}>{answer}</Text>
                    </View>
                ))}
              </View>
            </View>
          )
        }}
      />

      <TouchableOpacity style={styles.nextContainer}>
        <Text style={styles.next}>
          Next
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  crownText: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginTop: 24,
    marginLeft: 40,
  },
  secondLine:{
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#713200',
    marginBottom: 20,
    marginLeft: 40,
  },
  TextContainer: {
    width: 352,
    height: 129,
    flexShrink: 0,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#472415',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  textInsideContainer: {
    color: '#472415',
    marginHorizontal: 10,
  },
  line: {
    width: '95%',
    height: 0.5,
    backgroundColor: '#713200',
    marginTop: 5,
    marginBottom: 5,
  },
  gotit: {
    color: 'black',
    fontSize: 20,
    fontStyle: 'italic',
    marginLeft: 260,
  },
  text: {
    color: '#000000',
    fontSize: 25,
    fontStyle: 'italic',
    marginTop: 10,
    textAlignVertical: 'center', // Center the text vertically
    alignSelf: 'flex-start', // Align the text to the start (left) horizontally
  },
  miniText: {
    color: '#000000',
    fontSize: 15,
    fontStyle: 'italic',
    marginTop: 10,
    textAlignVertical: 'center', // Center the text vertically
    alignSelf: 'flex-start', // Align the text to the start (left) horizontally
  },
  Notsure: {
    color: 'black',
    fontSize: 25,
    textAlignVertical: 'center', // Center the text vertically
    alignSelf: 'flex-end', // Align the text to the start (left) horizontally
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15,
  },
  rectangle1: {
      backgroundColor: `rgba(217, 217, 217, 1)`,
      width: 91,
      height: 95,
      marginHorizontal: 15,
  },
  QuestionBox: {
    margin: 10, // Set equal left and right margins
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400, // Set a specific width for the container
  },
  rectangle2: {
    tintColor: `rgba(237, 224, 212, 1)`,
    width: 91,
    height: 95,
    marginHorizontal: 15,
  },
  imageRow: {
    flexDirection: 'row', // Arrange images in a row horizontally
    alignItems: 'center', // Center items vertically within the row
  },
  rectangleContainer: {
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
  },
  rectangleText: {
    textAlign: 'center',
    top: -55, // Adjust the margin-top as needed for additional spacing
  },
  next: {
    color: 'black',
    fontSize: 28,
    fontWeight: '400',
  },
  nextContainer: {
    backgroundColor: '#C9A227', // Orange background color
    height: 45, // Height of the rectangle
    width: 75, // Width of the rectangle
    marginTop: 15,
    marginBottom: 50,
    left: 300,
    justifyContent: 'center', // Center content vertically inside the rectangle
    alignItems: 'center', // Center content horizontally inside the rectangle
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4, // Add border radius of 4
  },
});