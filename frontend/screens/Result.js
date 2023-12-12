import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Image, SectionList, TouchableOpacity, Pressable, Input } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from '../components/BottomBar';
import Icon from 'react-native-vector-icons/Ionicons';
import { BACKEND_DEV_AND,BACKEND_DEV_IOS,BACKEND_PROD,isProd } from '../secrets';
import { ScrollView } from 'react-native-gesture-handler';

export default function Result({ navigation }) {
  
  const [hairType, setHairType] = useState(null);
  const [hairDescription, setHairDescription] = useState(null);
  const backend_base_url = isProd ? BACKEND_PROD : (Platform.OS === 'android' ? BACKEND_DEV_AND : BACKEND_DEV_IOS);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the userEmail from AsyncStorage
        const userEmail = await AsyncStorage.getItem('userEmail');

        // Check if userEmail is available before making the fetch request
        if (!userEmail) {
          console.error('User email not found in AsyncStorage');
          return;
        }

        const response = await fetch(`${backend_base_url}/getHairType`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail: userEmail }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const { hairType, hairDescription } = data;
        setHairType(hairType);
        setHairDescription(hairDescription);
      } catch (error) {
        console.error('Error fetching hair type:', error);
      }
    };

    fetchData();
  }, []);  // No dependencies, since we are only reading from AsyncStorage once

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.resultsHeader}><Icon name="chevron-back-outline" size={30} color="black"/>Hair Type Results</Text>
      </TouchableOpacity>
      <Text style={styles.resultsHeader2}>The results are in!</Text>
      <Text style={styles.analysisHeader}>Our analysis shows that you have...</Text>
      <Text style={styles.hairType}>{hairType}</Text>
      <Image
        source={require('../assets/hairTypeChart.png')}
        style={styles.hairTypeChart}
      ></Image>
      <Text style={styles.hairDescription}> <Text style={{ fontWeight: 'bold' }}>Your hair type is {hairType}</Text>. {hairDescription}</Text>

      <TouchableOpacity style={styles.productsButton} onPress={() => navigation.navigate('ProductsPage')}>
        <Text style={styles.buttonText}>SHOW ME THE PRODUCTS!</Text>
      </TouchableOpacity>
    </ScrollView>
    <BottomBar navigation={navigation} />
    </SafeAreaView>
 
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'white'
  },

  resultsHeader:{ 
    fontSize: 28,
    fontWeight: "500",
    marginVertical: 20,
    marginLeft:20
  },
  resultsHeader2:{
    fontSize: 16,
    marginLeft: 50,
    color: '#713200'
  },
  analysisHeader:{
    fontSize: 20,
    marginVertical: 20,
    marginHorizontal: 50,
  },
  hairType:{
    fontSize: 24,
    textAlign: 'center',
    fontWeight:"bold",


  },
  hairDescription:{
    marginLeft:30,
    marginRight: 30,
    fontSize:15,
    marginTop: 20,
    
  },
  productsButton: {
    backgroundColor: '#E3A387', // Orange background color
    height: 30, // Height of the rectangle
    width: 200, // Width of the rectangle
    marginTop: 20,
    marginBottom: 200,
    left: '40%',
    justifyContent: 'center', // Center content vertically inside the rectangle
    alignItems: 'center', // Center content horizontally inside the rectangle
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12, // Add border radius of 4
    fontWeight: 'bold',
  },
  hairTypeChart:{
    width: '90%',
  height: '30%',
  resizeMode: 'contain', // Add resizeMode property
  alignSelf:'center',
  },

});