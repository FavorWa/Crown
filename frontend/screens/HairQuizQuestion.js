import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SectionList, TouchableOpacity, Pressable, Input } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';




export default function HairQuizQuestion({ navigation }) {
  
  const[questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({}); // To track selected answers for all questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // Track the current category
  
 
   // Group questions by category
   const groupedQuestions = questions.reduce((acc, question) => {
    acc[question.category] = acc[question.category] || [];
    acc[question.category].push(question);
    return acc;
  }, {});

  const currentCategory = Object.keys(groupedQuestions)[currentCategoryIndex];
  const currentQuestions = groupedQuestions[currentCategory];


  const onPressHandler = () => {
      // navigation.navigate('HomePage');
      navigation.goBack();
  }

  const getUserEmail = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('userEmail');
      return userEmail;
    } catch (error) {
      console.error('Error getting user email from AsyncStorage:', error);
      return null;
    }
  };

  const handleResponse = (question, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [question]: answer });
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If there are no more questions in the current category, switch to the next category
      //nextCategory();
    }
  };
  
  const nextCategory = () => {
    if (currentCategoryIndex < Object.keys(groupedQuestions).length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0); // Reset the question index for the new category
    }
    else{
      submitResponses();
      navigation.navigate('Result');
    }
  };

  const previousCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setCurrentQuestionIndex(0);
    }
  };

  const startOver = () => {
    setCurrentCategoryIndex(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
  };

  const submitResponses = async () => {
    const userEmail = await getUserEmail();

    if (!userEmail) {
      alert('Unable to retrieve user email.');
      return;
    }

    if (Object.keys(selectedAnswers).length === questions.length) {
      const selectedAnswersArray = Object.values(selectedAnswers);
      
      // Include user's email along with the responses
      axios
        .post('http://127.0.0.1:8000/submit_response', {
          userEmail: userEmail,
          answers: selectedAnswersArray,
        })
        .then(() => {
          // Handle successful response submission
          
        })
        .catch((error) => console.error('Error submitting responses:', error));
      
        
      
    } else {
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
      {currentCategoryIndex === 0 ? (
        <View>
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
        </View>
      ) : (
        <TouchableOpacity>
          
          <Text style={styles.categoryText}onPress={previousCategory}>{currentCategory}</Text>
        </TouchableOpacity>
      )}

      {currentQuestions && currentQuestions.map((item, index) => (
        <View key={index} style={styles.QuestionBox}>
          <Text style={styles.questionText}>{item.question}</Text>
          <Text style={styles.miniText}>{item.description}</Text>
          <View style={{ ...styles.imageRow, marginTop: 25 }}>
        {item.answers.map((answer, answerIndex) => (
          <TouchableOpacity
            key={answerIndex}
            style={{
              ...styles.rectangle2,
              borderWidth: selectedAnswers[item.question] === answer ? 3 : 1,
            }}
            onPress={() => handleResponse(item.question, answer)}
          >
            <Image source={require('../assets/Rectangle4.png')} style={styles.rectangle2} />
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
</View>
        </View>
      ))}

<TouchableOpacity
  style={styles.nextContainer}
  onPress={nextCategory}
>
<Text style={styles.next}>
          {currentCategoryIndex < Object.keys(groupedQuestions).length - 1
            ? 'Next'
            : 'Finish'}
        </Text>
</TouchableOpacity>
<TouchableOpacity
        style={styles.startOverButton}
        onPress={startOver}
      >
        <Text style={styles.startOverText}>
          Start Over
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
    
    marginLeft: 260,
  },
  questionText: {
    color: '#000000',
    fontSize: 20,
    marginTop: 10,
    textAlignVertical: 'center', // Center the text vertically
    alignSelf: 'flex-start', // Align the text to the start (left) horizontally
    fontFamily: '',
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
    borderWidth: 2,
    borderColor: '#472415',
    alignItems: 'center', //Center items horizontally
    
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
  answerText: {
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
    fontSize: 14,
    fontWeight: '400',
  },
  nextContainer: {
    backgroundColor: '#C9A227', // Orange background color
    height: 26, // Height of the rectangle
    width: 54, // Width of the rectangle
    marginTop: 15,
    marginBottom: 50,
    left: 300,
    justifyContent: 'center', // Center content vertically inside the rectangle
    alignItems: 'center', // Center content horizontally inside the rectangle
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4, // Add border radius of 4
  },
  startOverButton:{
    alignItems: 'center',
    color: '#713200',
    marginBottom: 20,
  },

  categoryText:{
    fontSize: 24,
    fontWeight: 500,
    marginTop: 30,
    marginLeft: 30,
  }
});