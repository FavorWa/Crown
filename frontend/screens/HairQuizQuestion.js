import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SectionList, TouchableOpacity, Pressable, Input } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';



export default function HairQuizQuestion({ navigation }) {
  
  const[questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({}); // To track selected answers for all questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const onPressHandler = () => {
      // navigation.navigate('HomePage');
      navigation.goBack();
  }
  const handleResponse = (question, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [question]: answer });
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  

  const submitResponses = () => {
    // Check if all questions have been answered
    if (Object.keys(selectedAnswers).length === questions.length) {
      // All questions have been answered
      const selectedAnswersArray = Object.values(selectedAnswers);
      axios
        .post('http://127.0.0.1:8000/submit_response', {
          answers: selectedAnswersArray,
          // You may include user identifier (email, username) here
        })
        .then(() => {
          // Handle successful response submission (e.g., show a confirmation message)
        })
        .catch((error) => console.error('Error submitting responses:', error));
    } else {
      // Not all questions have been answered, you can show an error message
      alert('Please answer all questions before proceeding.');
    }
  };

  useEffect(() => {
    // Fetch questions from your backend API
    axios
      .get('http://127.0.0.1:8000/questions')
      .then((response) => {
        setQuestions(response.data); // Assuming your API returns an array of questions
      })
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);
  
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

      {questions.map((item, index) => (
        <View key={index} style={styles.QuestionBox}>
          <Text style={styles.text}>{item.question}</Text>
          <Text style={styles.miniText}>{item.description}</Text>
          <View style={{ ...styles.imageRow, marginTop: 25 }}>
  {item.answers.map((answer, answerIndex) => (
    <TouchableOpacity
      key={answerIndex}
      style={{
        ...styles.rectangleContainer,
      }}
      onPress={() => handleResponse(item.question, answer)}
    >
      <Image source={require('../assets/Rectangle4.png')} style={styles.rectangle2} />
      <Text style={styles.rectangleText}>{answer}</Text>
    </TouchableOpacity>
  ))}
</View>
        </View>
      ))}

<TouchableOpacity
  style={styles.nextContainer}
  onPress={submitResponses}
>
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
    marginTop: 64,
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
  answers: {
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
    maxWidth:'100%',
  },
  rectangle2: {
    tintColor: `rgba(237, 224, 212, 1)`,
    width: 91,
    height: 95,
    marginHorizontal: 15,
    alignItems: 'left',
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap', // Allow items to wrap to the next row
    justifyContent: 'center',
  },
  rectangleContainer: {
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
  },
  rectangleText: {
    textAlign: 'center',
    top: -55,
    fontSize: 14, // Adjust the font size as needed
    maxWidth: 80, // Set a maximum width for the text
    overflow: 'hidden', // Hide overflow text
    whiteSpace: 'nowrap', // Prevent text from wrapping to the next line
    textOverflow: 'ellipsis', // Show an ellipsis (...) for overflow text
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