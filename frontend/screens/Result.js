import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Image, SectionList, TouchableOpacity, Pressable, Input } from 'react-native';

export default function Result({ navigation }) {
  
  const [hairType, setHairType] = useState(null);
  const [hairDescription, setHairDescription] = useState(null);

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

        const response = await fetch('http://127.0.0.1:8000/getHairType', {
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
    <View>
      <Text style={styles.header}>Hair Type Results</Text>
      <Text style={styles.header2}>Your Hair Type is...</Text>
      <Text style={styles.hairType}>{hairType}</Text>
      <Text style={styles.hairDescription}> <Text style={{ fontWeight: 'bold' }}>Your hair type is {hairType}</Text>. {hairDescription}</Text>

      <TouchableOpacity style={styles.productsButton} onPress={() => navigation.navigate('ProductsPage')}>
        <Text style={styles.buttonText}>Products</Text>
      </TouchableOpacity>
    </View>
   
 
  );
}

const styles = StyleSheet.create({

  header:{
    width: 245,
    height: 29, 
    fontFamily: 'Rig Sans',
    fontSize: 24,
    fontWeight: "500",
    marginTop: 50,
    marginLeft:20
  },
  header2:{
    fontSize: 16,
    marginLeft: 20,


  },
  hairType:{
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
    fontWeight:"bold",


  },
  hairDescription:{
    marginLeft:30,
    marginRight: 30,
    fontSize:15,
    marginVertical: 200,
    
  },
  productsButton: {
    backgroundColor: '#C9A227', // Orange background color
    height: 30, // Height of the rectangle
    width: 70, // Width of the rectangle
    marginTop: 15,
    marginBottom: 50,
    left: 300,
    justifyContent: 'center', // Center content vertically inside the rectangle
    alignItems: 'center', // Center content horizontally inside the rectangle
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4, // Add border radius of 4
    fontWeight: 'bold',
  },

});