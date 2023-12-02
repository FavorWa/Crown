import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image,TextInput, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { useNavigation } from '@react-navigation/native';


export default function Inspo({ navigation }) {
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    // Add other configurations as needed
  });

  const ImageGallery = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const navigation = useNavigation();
    

    useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await axiosInstance.get('/get_images');
          let shuffleImages = shuffle(response.data.image_urls || []);
          setImageUrls(shuffleImages);  // Assuming the response.data is an array of image URLs
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };

      fetchImages();
    }, []);

    const shuffle = (array) => {
      let currentIndex = array.length, randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }

      return array;
    };
    
    const handleImageClick = (imageUrl) => {
      setSelectedImageUrl(imageUrl);
    };
  
    const closeModal = () => {
      setSelectedImageUrl(null);
    };  

    return (
      <ScrollView contentContainerStyle={styles.imageGallery}>
        {imageUrls.map((imageUrl, index) => (
          <Image
            key={index}
            source={{ uri: imageUrl }}
            style={[styles.image, index % 2 == 0 && styles.staggeredImage]}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Inspiration</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for hairstyles and more"
          placeholderTextColor="grey"
        />
      </View>
      <ImageGallery />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Righteous',
    textAlign: 'left',
    marginLeft: 34,
    marginTop: 10,
    
  },
  searchBarContainer: {
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
  },
  imageGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  image: {
    width: '48%', // Two images per row
    height: 200,
    borderRadius: 15,
    marginVertical: 5,
    borderWidth: 1, // Border width
    borderColor: '#3E2723', // Brown color
  },
  staggeredImage: {
    marginTop: 20, // Adjust the margin as needed for staggered effect
  },
});