import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Image,TextInput, Modal, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { useNavigation, StackActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { BACKEND_DEV_AND,BACKEND_DEV_IOS,BACKEND_PROD,isProd } from '../secrets';

const screenWidth = Dimensions.get('window').width;

export default function Inspo() {
  const [imageUrls, setImageUrls] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const backend_base_url = isProd ? BACKEND_PROD : (Platform.OS === 'android' ? BACKEND_DEV_AND : BACKEND_DEV_IOS);
  const axiosInstance = axios.create({
    baseURL: backend_base_url,
  });

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get('/get_images', {
          params: { search_term: searchTerm },
        });
        let shuffleImages = shuffle(response.data.image_urls || []);
        setImageUrls(shuffleImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [searchTerm]);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImageUrl(null);
    setModalVisible(false);
    navigation.navigate('Inspo');
  };

  const handleSearchSubmit = () => {
    // You can trigger the search here when the user presses Enter
    setSearchTerm(searchTerm.trim()); // Optional: Trim whitespace from the search term
  };

  const handleTermClick = (term) => {
    setSearchTerm(term);
  };


  const saveImage = async () => {
    try {
      // Make an API call to save the image URL to the backend
      await axiosInstance.post('/save_image', { imageUrl: selectedImageUrl });

      // You can also provide feedback to the user that the image has been saved
      alert('Image saved successfully!');
    } catch (error) {
      console.error('Error saving image:', error);
      // Handle the error, e.g., show an error message to the user
      alert('Error saving image. Please try again.');
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="black" barStyle="dark-content" />
      <TouchableOpacity onPress={() => navigation.navigate('Homepage')}>
        <Text style={styles.header}>
          <Icon name="chevron-back-outline" size={30} color="black" />
          Inspiration
        </Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.header2}>
          Not sure of your next look? We're sure you'll find ideas here
        </Text>
      </View>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for hairstyles, treatments, and more"
          placeholderTextColor="grey"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={handleSearchSubmit}
        />
      </View>
      <ScrollView contentContainerStyle={styles.imageGallery}>
      <View style={styles.termsContainer}>
        <TouchableOpacity onPress={() => handleTermClick('Natural')} style={styles.termButton}>
          <Text style={styles.termButtonText}>Natural</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTermClick('Braids')} style={styles.termButton}>
          <Text style={styles.termButtonText}>Braids</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTermClick('Locs')} style={styles.termButton}>
          <Text style={styles.termButtonText}>Locs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTermClick('Protective')} style={styles.termButton}>
          <Text style={styles.termButtonText}>Protective Styles</Text>
        </TouchableOpacity>
      </View>
        {imageUrls.map((imageUrl, index) => (
          <TouchableOpacity key={index} onPress={() => handleImageClick(imageUrl)}>
            <Image
              source={{ uri: imageUrl }}
              style={[styles.image, index % 2 == 0 && styles.staggeredImage]}
            />       
          </TouchableOpacity>

        ))}
      </ScrollView>
      <Modal
  animationType="slide"
  transparent={false}
  visible={modalVisible}
  onRequestClose={closeModal}
>
<Swiper loop={false} index={imageUrls.indexOf(selectedImageUrl)} showsPagination={false}>
          {imageUrls.map((imageUrl, index) => (
            <View key={index} style={styles.modalContainer}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButtonContainer}>
                <Text style={styles.closeButton}>
                  <Icon name="close" size={40} color="black" />
                </Text>
              </TouchableOpacity>
              <View style={styles.modalImageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.modalImage} />
              </View>
              <TouchableOpacity style={styles.saveButtonContainer}>
                <Text style={styles.saveButton}>Save</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Swiper>
</Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 10,
  },
  header2: {
    alignContent: 'center',
    color: '#713200',
    marginLeft: 34,
    fontSize: 12,
    paddingBottom: 30,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 20,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  icon: {
    paddingLeft: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: '#e0e0e0',
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
  },
  imageGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  image: {
    width: (screenWidth - 30) / 2,
    height: 200,
    borderRadius: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#3E2723',
  },
  staggeredImage: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white', // Slightly darker background
  },
  modalImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalImage: {
    marginTop: 40,
    flex: 1,
    width: '95%',
    maxHeight: '80%',
    //resizeMode: 'contain', // Adjust the resizeMode as needed
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#3E2723',
  },
  closeButton: {
    fontSize: 24,
    color: 'white',
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  saveButtonContainer: {
    backgroundColor: '#E3A387', // Set the background color for the save button
    padding: 10,
    marginTop: 0,
    paddingBottom:10,
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth:1,
    borderColor: '#472415',
    marginBottom: 30,

  },
  saveButton: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    maxWidth: '100%',
    flexWrap:'wrap',
    alignSelf:'center',
  },
  termButton: {
    backgroundColor: '#E3A387',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#472415',
    marginHorizontal: 5,
    marginBottom: 10,
    
  },
  termButtonText: {
    color: 'black',
  },
});