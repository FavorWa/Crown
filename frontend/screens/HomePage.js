import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Box from '../components/Box';
import { selectableImages } from './User';
import callApi from '../functions/callApi';
import axios from 'axios';
import BottomBar from '../components/BottomBar';



export default function Homepage({ navigation }) {

  const [blogs, setBlogs] = useState([]);

  const isLoggedIn = async (web) => {
    try {
      const login = await AsyncStorage.getItem('LoginStatus');
      if (login !== 'true') {
        navigation.replace('Login');
      } else {
        navigation.replace(web);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  const [userAvatar, setUserAvatar] = useState(null);
  const fetchUserAvatar = async () => {
    const loginStatus = await AsyncStorage.getItem('LoginStatus');
    if (loginStatus === 'true') {
      const avatar = await AsyncStorage.getItem('userAvatar');
      setUserAvatar(avatar);
    }
  };

  const fetchBlogs = async () => {
    const blogs = await callApi("/blogs/sample");
    setBlogs(blogs);
  }

  const showBlogs = () => {
    const NUM_BOXES = 6;
    const blogsBoxes = [];
    for (let index = 0; index < NUM_BOXES; index++) {
      try {
        const blogObj = blogs[index];
        if (blogObj) {
          const blogBox = 
          <Box 
            image = {blogObj.image}
            title = {blogObj.title}
            link = {blogObj.link}
            time = {blogObj.time}
            isArticle = {blogObj.isArticle}
            _id = {blogObj._id}
            navigation = {navigation}
          />
          blogsBoxes.push(blogBox)
        }
      }

      catch {
        blogsBoxes.push(
          <Image
            source={require('../assets/Rectangle4.png')}
            style={styles.scrollObject}
          />
        )
      }
    }

    return blogsBoxes;
  }
  
  
  
  useEffect(() => {
    fetchUserAvatar();
    fetchBlogs();
  }, []);
  
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    // Add other configurations as needed
  });

  const ImageGallery = () => {
    const [imageUrls, setImageUrls] = useState([]);

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

    return (
      <ScrollView horizontal>
      {imageUrls.map((imageUrl, index) => (
        <Image
        key={index}
        source={{ uri: imageUrl }}
        style={{
          width: 150,
          height: 200,
          borderRadius: 15,
          marginRight: 10,
          borderWidth: 1, // Border width
          borderColor: '#3E2723', // Brown color
        }}
        indicatorProps={{
          size: 40,
          borderWidth: 2,
          color: 'rgba(150, 150, 150, 1)',
          unfilledColor: 'rgba(200, 200, 200, 0.2)',
        }}
      />
      
    ))}
    </ScrollView>
    );
  };

  
  return(
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollContainer}>
    
      <Text style={styles.hairquiz}>
        Hair Quiz
      </Text>
      <Image
        source={require('../assets/profile_page.png')}
        style={styles.HairQuizPhoto}
      ></Image>

      <TouchableOpacity onPress={() => navigation.navigate('HairQuizQuestion')}>
        <Image
          style={styles.takeTheQuizContainer} 
        ></Image>
        <Text style={styles.takeTheQuiz}>
          Take the Quiz
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Blogs')}>
        <Text style={styles.blogs}>
          Blogs
        </Text>
      </TouchableOpacity>
      
      <View style={styles.blogScrollContainer}>
        <ScrollView horizontal={true} >
          {showBlogs()}
        </ScrollView>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Blogs')}>
        <Text style={styles.seeAll}> See all </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Inspo')}>
        <Text style={styles.Inspiration}>
          Inspiration
        </Text>
      </TouchableOpacity>
      <View style={styles.InspirationScrollContainer}>
      <ImageGallery />
    </View>
  
      <TouchableOpacity onPress={() => navigation.navigate('Inspo')}>
      <Text style={styles.seeAll}> See all </Text>
      </TouchableOpacity> 
    </ScrollView>
    <BottomBar navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer:{
    flex: 1
  },
  hairquiz: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    left: 28,
    top: 5,
  },
  image: {
    width: 100, // Set the width of each image as needed
    height: 100, // Set the height of each image as needed
    margin: 5,
    borderRadius: 10,
  },
  takeTheQuiz: {
    textAlign: 'center', // Center the text horizontally within the container
    lineHeight: 24, // Set the line height to match the height of the container
    fontWeight: '400', // Use 'bold' instead of 400 for a bolder font weight
    fontSize: 14,
    marginTop: 170,
    marginLeft: 190,
    fontWeight: "bold",
    
  },
  takeTheQuizContainer: {
    backgroundColor: '#E3A387',
    borderColor: '#000000',
    borderWidth: 1,
    width: 120,
    height: 30,
    borderRadius: 10, 
    left: 250,
    top: 196,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  HairQuizPhoto: {
    backgroundColor: 'rgba(217, 217, 217, 1)',
    height: 160,
    position: 'absolute',
    width: '100%',
    top: 40,
  },
  blogs: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    left: 33,
  },
  seeAll: {
    color:'#472415',
    fontSize: 14,
    left: 300,
    marginTop: 30,
    fontWeight:'bold',
    
  },
  Compass: {
    aspectRatio: 1.2,
    marginLeft: 100,
    marginTop: 15,
  },
  Compassword: {
    marginLeft: 100,
  },
  Barbershop: {
    aspectRatio: 1.2,
    marginLeft: 200,
    marginTop: -55,
  },
  Barbershopword: {
    marginLeft: 203,
    marginBottom: -40,
  },
  User: {
    marginLeft: 300,
    marginTop: -55,
    aspectRatio: 1.2,
  },
  Userword: {
    marginLeft: 303,
    marginBottom: -40,
  },

  Bottonline: {
    width: '100%',
    height: 110,
    flexShrink: 0,
    borderRadius: 39,
    borderWidth: 1,
    borderColor: '#472415',
    marginHorizontal: 30,
    backgroundColor:"white",
    position:'absolute',
    bottom: -170,
    flexDirection:'column',
    flexGrow: 1,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 40,
    marginLeft: 300,
    marginVertical: -55,
  },
  blogScrollContainer:{
    top: 15,
    height: 160,
    marginHorizontal: 28,
  },
  scrollObject: {
    height: 160,
    width: 120,
    borderRadius: 15,
    marginRight: 10,
  },
  Inspiration: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    left: 33,
    fontFamily: 'Rig Sans',
  },
  InspirationScrollContainer:{
    top: 15,
    marginHorizontal: 28,
    marginBottom: 0
  },
});