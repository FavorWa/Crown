import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Box from '../components/Box';
import { selectableImages } from './User';
import callApi from '../functions/callApi';
import axios from 'axios';
import BottomBar from '../components/BottomBar';
import { BACKEND_DEV_AND,BACKEND_DEV_IOS,BACKEND_PROD,isProd } from '../secrets';



export default function Homepage({ navigation }) {
  
  const backend_base_url = isProd ? BACKEND_PROD : (Platform.OS === 'android' ? BACKEND_DEV_AND : BACKEND_DEV_IOS);
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

  const handleProfileNavigation = async () => {
    if (await AsyncStorage.getItem('LoginStatus') !== 'true') {
      navigation.replace('Login');
    } else {
      if (await AsyncStorage.getItem('userIdentity') === 'true') {
        navigation.replace('UserStylist');
      } else {
        navigation.replace('User');
      }
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
            key={blogObj._id}
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
    baseURL: backend_base_url,
    // Add other configurations as needed
  });

  const ImageGallery = () => {
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await axiosInstance.get('/get_images');
          let shuffleImages = shuffle(response.data.image_urls || []);
          const limitedImages = shuffleImages.slice(0, 12);
          setImageUrls(limitedImages);  // Assuming the response.data is an array of image URLs
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
        <View style={{ width: 33 }}></View>
        {imageUrls.map((imageUrl, index) => (
        <Image
        key={index}
        source={{ uri: imageUrl }}
        style={{
          width: 120,
          height: 190,
          borderRadius: 15,
          marginRight: 20,
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

      <TouchableOpacity onPress={() => isLoggedIn('Communication')}>
        <Image
          source={require('../assets/MessageIcon.png')}
          style={{width: 20, height: 20, top: -15, left: 350}}
        ></Image>
      </TouchableOpacity>

      <TouchableOpacity
          onPress={() => navigation.navigate('HairQuizQuestion')}
          style={styles.takeTheQuizContainer}
        >
          <Text style={styles.takeTheQuiz}>Take the Quiz</Text>
        </TouchableOpacity>
      
      <View style={styles.blogScrollContainer}>
      <Text style={styles.blogs}>
        Blogs
      </Text>
        <ScrollView horizontal={true} >
          <View style={{ width: 33 }}></View>
          {showBlogs()}
        </ScrollView>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Blogs')}>
        <Text style={styles.seeAllBlogs}> See all </Text>
      </TouchableOpacity>

      <Text style={styles.Inspiration}>
        Inspiration
      </Text>

      <View style={styles.InspirationScrollContainer}>
      <ImageGallery />
    </View>
  
      <TouchableOpacity onPress={() => navigation.navigate('Inspo')}>
      <Text style={styles.seeAllInspo}> See all </Text>
      </TouchableOpacity> 
    </ScrollView>
    <BottomBar navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    color:'#FFFFFF',
    flex: 1,
  },
  scrollContainer:{
    color: '#FFFFFF',
    flex: 1
  },
  hairquiz: {
    textAlign: 'left',
    fontWeight: '500',
    fontSize: 24,
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
    fontSize: 14,
    fontWeight: "bold",
    color: 'black',
    
  },
  takeTheQuizContainer: {
    backgroundColor: '#E3A387',
    width: 120,
    height: 30,
    marginTop: 170,
    marginLeft: '60%',
    borderRadius: 10,
    borderWidth:1,
    borderColor:'black',
    justifyContent: 'center', // Center content vertically inside the box
    alignItems: 'center', // Center content horizontally inside the box
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
    fontWeight: '500',
    fontSize: 24,
    color: 'black',
    left: 33,
  },
  seeAllBlogs: {
    color:'#472415',
    fontSize: 14,
    left: 300,
    marginTop: 30,
    fontWeight:'bold',
  },
  seeAllInspo: {
    color:'#472415',
    fontSize: 14,
    left: 300,
    marginTop: 30,
    fontWeight:'bold',
    marginBottom:100,
    
  },
  
  scrollObject: {
    height: 160,
    width: 120,
    borderRadius: 15,
    marginRight: 10,
  },
  
  Inspiration: {
    textAlign: 'left',
    fontWeight: '500',
    fontSize: 24,
    color: 'black',
    left: 33,
    marginTop: 0,
  },
  InspirationScrollContainer:{
    top: 15,
    marginHorizontal: 0,
    marginBottom: 0
  },
});