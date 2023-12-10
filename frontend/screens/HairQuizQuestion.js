import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HairQuizQuestion({ navigation }) {
  
  const[questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({}); // To track selected answers for all questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // Track the current category
  const [showPopup, setShowPopup] = useState(false);
  const [popupAnswers, setPopupAnswers] = useState([]);
  const [selectedNotSureIndex, setSelectedNotSureIndex] = useState(null);
  
 
   // Group questions by category
   const groupedQuestions = questions.reduce((acc, question) => {
    acc[question.category] = acc[question.category] || [];
    acc[question.category].push(question);
    return acc;
  }, {});

  const currentCategory = Object.keys(groupedQuestions)[currentCategoryIndex];
  const currentQuestions = groupedQuestions[currentCategory];


  const showNotSurePopup = (answers, index) => {
    setPopupAnswers([{ answers, details: currentQuestions[index].details }]);
    setSelectedNotSureIndex(index);
    setShowPopup(true);
  };

  const hidePopup = () => {
    setShowPopup(false);
    setSelectedNotSureIndex(null);
  };

  const NotSurePopup = () => (
    <Modal
    transparent={true}
    animationType="slide"
    visible={showPopup}
    onRequestClose={hidePopup}
  >
    <TouchableWithoutFeedback onPress={hidePopup}>
      <View style={styles.modalOverlay} />
    </TouchableWithoutFeedback>

    <View style={styles.popupContainer}>
      <ScrollView>
        {popupAnswers.map((answerSet, setIndex) => (
          <View key={setIndex} style={styles.popupAnswerContainer}>
            {answerSet.answers.map((answer, answerIndex) => (
              <View key={answerIndex}>
                <Text style={styles.popupAnswerTextBold}>{answer}</Text>
                <Text style={styles.popupDescriptionText}>
                  {answerSet.details[answerIndex]}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  </Modal>
);

  

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
    <SafeAreaView style={styles.container}>
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
         
          <Text style={styles.crownText}onPress={previousCategory}>
          <Icon name="chevron-back-outline" size={30} color="black"/>{currentCategory}</Text>
        </TouchableOpacity>
      )}

      {currentQuestions && currentQuestions.map((item, index) => (
       <View key={index} style={styles.QuestionBox}>
       <View style={styles.questionContainer}>
         <View style={styles.questionNumberContainer}>
           <Text style={styles.questionNumber}>{index + 1}</Text>
         </View>
         <View style={styles.questionTextContainer}>
           <Text style={styles.questionText}>{item.question}</Text>
           <Text style={styles.miniText}>{item.description}</Text>
         </View>
       </View>
         
          {item.details && (
          <TouchableOpacity
            style={styles.notSureButton}
            onPress={() => showNotSurePopup(item.answers, index)}
          >
          <Text style={styles.notSureButtonText}>NOT SURE?</Text>
          
          </TouchableOpacity>
          
)}
        <View style={{ ...styles.answerRow}}>
        {item.answers.map((answer, answerIndex) => (
          <TouchableOpacity
            key={answerIndex}
            style={{
              ...styles.answerBox,
              
              borderWidth: selectedAnswers[item.question] === answer ? 3 : 1,
            }}
            onPress={() => handleResponse(item.question, answer)}
          >
            
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
          START OVER
        </Text>
      </TouchableOpacity>
     <NotSurePopup/>
    </ScrollView>
    </SafeAreaView>
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
    marginTop: 20,
    marginVertical:10,
    marginLeft: 30,
    flexDirection:'row',
    alignItems: 'center',
  },
  secondLine:{
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#713200',
    marginBottom: 20,
    marginLeft: 30,
    alignItems: 'center',
  },
  TextContainer: {
    width: 370,
    height: 210,
    flexShrink: 0,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#472415',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  textInsideContainer: {
    color: '#000000',
    marginHorizontal: 15,
    marginVertical: 10,
    lineHeight: 25,
    fontSize: 15
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
    fontSize: 15,
    marginLeft: 260,
  },
  questionText: {
    color: '#000000',
    fontSize: 16,
    marginTop: 10,
    textAlignVertical: 'center', // Center the text vertically
    alignSelf: 'flex-start', // Align the text to the start (left) horizontally
    fontFamily: '',
    fontWeight: 'bold',
  },
  miniText: {
    color: '#000000',
    fontSize: 15,
    marginTop: 10,
    marginRight:15,
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
    marginHorizontal: 10, // Set equal left and right margins
    marginVertical:30,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 400, // Set a specific width for the container
    maxWidth:'100%',
  },
  answerBox: {
    backgroundColor: '#EDE0D4',
    width: 110,
    height: 95,
    marginHorizontal: 5,
    borderColor: '#472415',
    alignItems: 'center', //Center items horizontally
    marginVertical: 10,
    
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap', // Allow items to wrap to the next row
    marginTop: 25,
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  answerText: {
    textAlign: 'center',
    top: 40,
    fontSize: 14, // Adjust the font size as needed
    maxWidth: 100, // Set a maximum width for the text
    overflow: 'hidden', // Hide overflow text
    whiteSpace: 'nowrap', // Prevent text from wrapping to the next line
    textOverflow: 'ellipsis', // Show an ellipsis (...) for overflow text
    textTransform:'uppercase',
    
  },
  next: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextContainer: {
    backgroundColor: '#E3A387', // Orange background color
    height: 38, // Height of the rectangle
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
  startOverButton:{
    alignItems: 'center',
    marginBottom: 50,
  },
  startOverText:{
    color:'#713200'
  },
  notSureButton:{
    alignItems: 'flex-end',
    marginLeft: 280,
    marginVertical: 20,
  },
  notSureButtonText:{
    color:'#472415',
    fontWeight:'bold',
  },
  categoryText:{
    fontSize: 24,
    fontWeight: 500,
    marginTop: 30,
    marginLeft: 30,
  },
  questionContainer: {
    flexDirection: 'row', // Make it a row to position items horizontally
    alignItems: 'center', // Align items vertically in the center
    marginHorizontal: 5,
  },
  questionNumberContainer: {
    width: 24,
    height: 24,
    borderRadius: 12, // half of the width and height to make it a circle
    borderColor: '#713200', // or any other color you prefer
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    
    marginRight: 10, // adjust as needed
  },
  
  questionNumber: {
    color: 'black', // or any other color you prefer
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  popupContainer: {
    position: 'absolute',
    top: '10%', // Adjust as needed to center the modal vertically
    left: '5%', // Adjust as needed to center the modal horizontally
    width: '90%',
    maxHeight: '100%',
    backgroundColor: '#EDE0D4',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#713200',
    zIndex: 1,
  },
  popupAnswerContainer: {
    marginVertical: 20,
  },

  popupAnswerTextBold: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  popupDescriptionText: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 20,
  },
});