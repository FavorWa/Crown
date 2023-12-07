import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Box from '../components/Box';
import { selectableImages } from './User';
import callApi from '../functions/callApi';
import axios from 'axios'; 


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
    baseURL: 'http://127.0.0.1:8000/',
    // Add other configurations as needed
  });

  const ImageGallery = () => {
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await axiosInstance.get('/get_images');
          setImageUrls(response.data.image_urls || []);  // Assuming the response.data is an array of image URLs
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };

      fetchImages();
    }, []);

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
    <ScrollView style={styles.scrollContainer}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.hairquiz}>
        Hair Quiz
      </Text>
      <Image
        source={require('../assets/profile_page.png')}
        style={styles.rectangle4}
      ></Image>

      <TouchableOpacity onPress={() => isLoggedIn('Communication')}>
        <Image
          source={require('../assets/MessageIcon.png')}
          style={{width: 20, height: 20, top: -15, left: 350}}
        ></Image>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('HairQuizQuestion')}>
        <View style={styles.hairQuizRectangle}>
          <Text style={styles.takeTheQuiz}>
            Take the Quiz
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.blogs}>
        Blogs
      </Text>
      
      <View style={styles.blogScrollContainer}>
        <ScrollView horizontal={true} >
          <View style={{ width: 33 }}></View>
          {showBlogs()}
        </ScrollView>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Blogs')}>
        <Text style={{ color: '#472415', top: 30, marginBottom: 20, left: 350, fontSize: 16, fontWeight: '600'}}>See all</Text>
      </TouchableOpacity>

      <Text style={styles.Inspiration}>
        Inspiration
      </Text>

      <View style={styles.InspirationScrollContainer}>
        <View>
          <ImageGallery />
          <TouchableOpacity onPress={() => navigation.navigate('Inspo')}>
            <Text style={{ color: '#472415', top: 15, marginBottom: 20, left: 350, fontSize: 16, fontWeight: '600'}}>See all</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* <TouchableOpacity onPress={() => navigation.navigate('InHouseStylists')}>
        <Text style={styles.productPage}> In House Stylists </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('ProductsPage')}>
        <Text style={styles.productPage}> Products </Text>
      </TouchableOpacity>     */}

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: -15 }}>
        <View style={styles.Bottonline}> 
            <TouchableOpacity onPress={() => navigation.replace('Homepage')}>
              <Image
                source={require('../assets/Compass.png')}
                style={styles.Compass}
              ></Image>
            <Text style={styles.Compassword}>Discover</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => isLoggedIn('InHouseStylists')}>
            <Image
              source={require('../assets/Barbershop.png')}
              style={styles.Barbershop}
            ></Image>
            <Text style={styles.Barbershopword}>Stylist</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => isLoggedIn('User')}>
            {userAvatar ? (
              <Image source={selectableImages[userAvatar]} style={styles.avatar} />
            ) : (
              <>
                <Image source={require('../assets/User.png')} style={styles.User} />
                <Text style={styles.Userword}>Profile</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    color:'#FFFFFF',
    flex: 1,
    top: 50,
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
    fontWeight: '600', // Use 'bold' instead of 400 for a bolder font weight
    fontSize: 18,
    top: 5,
  },
  hairQuizRectangle: {
    alignItems: 'center',
    backgroundColor: '#E3A387',
    borderWidth: 1,
    borderColor: '#472415',
    width: 160,
    height: 35,
    borderRadius: 12, 
    left: 220,
    top: 150,
    marginBottom: 140,
  },
  rectangle4: {
    backgroundColor: 'rgba(217, 217, 217, 1)',
    height: 150,
    position: 'absolute',
    top: 40,
  },
  blogs: {
    textAlign: 'left',
    fontWeight: '500',
    fontSize: 24,
    color: 'black',
    left: 33,
  },
  productPage: {
    backgroundColor: '#add8e6',
    width: 100,
    height: 30,
    fontSize: 24,
    left: 280,
    marginTop: 30,
  },
  Compass: {
    aspectRatio: 1.2,
    marginLeft: 70,
    marginTop: 15,
  },
  Compassword: {
    marginLeft: 65,
  },
  Barbershop: {
    aspectRatio: 1.2,
    alignSelf: 'center',
    marginTop: -55,
  },
  Barbershopword: {
    alignSelf: 'center',
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#472415',
    marginHorizontal: 30,
    backgroundColor:"white",
    position:'absolute',
    bottom: -110,
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
    height: 190,
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
    height: 190,
    marginBottom: 70
  },
});