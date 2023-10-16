import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Input } from 'react-native';



export default function HairQuizQuestion({ navigation }) {
  
  const [curlPattern, setCurlPattern] = useState(null);
  const [hairDegree, setHairDegree] = useState(null);
  const [hairType, setHairType] = useState(null)

  const onPressHandler = () => {
      // navigation.navigate('HomePage');
      navigation.goBack();
    }
    const handleCurlPatternButtonPress = (type) => {
      setCurlPattern(type);
  }

    const handleHairDegreeButtonPress = (degree) => {
      console.log(degree);
      setHairDegree(degree);
      returnCurlPattern();
    }
  

    const returnCurlPattern = () => {
      let hairType = '';
      
      switch (curlPattern){ 
        case 'wavy':
          hairType = '2';
        break;
        case 'curly':
          hairType = '3';
        break;
        case 'coily':
          hairType = '4';
        break;
        default:
      }
      switch (hairDegree){
        case 'wide':
          hairType += 'A';
        break;
        case 'medium':
          hairType += 'B';
        break;
        case 'tight':
          hairType += 'C';
        break;
        default:
      }

      if (hairType === '') {
        hairType = 'Invalid';
      }
      console.log(hairType)
      setHairType(hairType)
    }
  
    return(
        <View>
          <Text style={styles.crownText}>
            Hair Quiz
          </Text>
          <Text style={styles.question}>
            Is your hair straight, wavy, curly, or coily?
          </Text>
          <View>
            <Text style={styles.question}>Select your hair type:</Text>
            <TouchableOpacity onPress={() => handleCurlPatternButtonPress('wavy')}>
                <View style={styles.choice}>
                    <View style={styles.radio}></View>
                    <Text>Wavy</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCurlPatternButtonPress('curly')}>
                <View style={styles.choice}>
                    <View style={styles.radio}></View>
                    <Text>Curly</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCurlPatternButtonPress('coily')}>
                <View style={styles.choice}>
                    <View style={styles.radio}></View>
                    <Text>Coily</Text>
                </View>
            </TouchableOpacity>
            
            {curlPattern && (
                <View>
                    <Text style={styles.question}>Select your hair degree:</Text>
                    <TouchableOpacity onPress={() => handleHairDegreeButtonPress('wide')} style={styles.button}>
                        <Text style={styles.buttonText}>Wide</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleHairDegreeButtonPress('medium')} style={styles.button}>
                        <Text style={styles.buttonText}>Medium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleHairDegreeButtonPress('tight')} style={styles.button}>
                        <Text style={styles.buttonText}>Tight</Text>
                    </TouchableOpacity>
                </View>
            )}
            {hairType &&(
              <View>
                <Text style={styles.buttonText}>You have {hairType} hair</Text>
              </View>
            )}
        </View>
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
    choice: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
      marginTop: 60,
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
      flexDirection: 'row',
    },
    buttonText:{
      marginTop:40,
      flexDirection: 'row',
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