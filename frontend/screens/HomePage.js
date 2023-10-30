import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Pressable, Image } from 'react-native';


export default function Homepage({ navigation }) {
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.hairquiz}>
        Hair Quiz
      </Text>
      <Image
        source={require('../assets/Rectangle4.png')}
        style={styles.rectangle4}
      ></Image>

      <TouchableOpacity onPress={() => navigation.navigate('HairQuiz')}>
        <Text style={styles.takeTheQuiz}>
          Take the Quiz
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Blogs')}>
        <Text style={styles.blogs}>
          Blogs
        </Text>
      </TouchableOpacity>
      <Image
          source={require('../assets/Rectangle4.png')}
          style={styles.rectangle5}
      ></Image>
      <Image
          source={require('../assets/Rectangle4.png')}
          style={styles.rectangle6}
      ></Image>
      <Image
          source={require('../assets/Rectangle4.png')}
          style={styles.rectangle7}
      ></Image>
      <Text style={styles.blogTitle1}>
        Fall 2023 hairStyles
      </Text>
      <View style={styles.BlogContainer}>
        <Text style={styles.blogText1}>
          good, bad, good, bad, good, bad, ugly, cool, bold, ughnot long enoughnot long enough
        </Text>
      </View>
      <Text style={styles.blogTitle2}>
        Winter 2023 hairStyles
      </Text>
      <View style={styles.BlogContainer2}>
        <Text style={styles.blogText2}>
          good, bad, good, bad, good, bad, ugly, cool, bold, ughnot long enoughnot long enough
        </Text>
      </View>

      <Text style={styles.inspiration}>
        Inspiration
      </Text>
      

      <TouchableOpacity onPress={() => navigation.navigate('ProductsPage')}>
        <Text style={styles.productPage}> Products </Text>
      </TouchableOpacity>
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.Bottonline}> 
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Image
              source={require('../assets/Compass.png')}
              style={styles.Compass}
            ></Image>
            <Text style={styles.Compassword}>Discover</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Image
              source={require('../assets/Barbershop.png')}
              style={styles.Barbershop}
            ></Image>
            <Text style={styles.Barbershopword}>Stylist</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Image
              source={require('../assets/Community.png')}
              style={styles.Community}
            ></Image>
            <Text style={styles.Communityword}>Community</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('User')}>
            <Image
              source={require('../assets/User.png')}
              style={styles.User}
            ></Image>
            <Text style={styles.Userword}>User</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hairquiz: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    left: 28,
    top: 20,
  },
  takeTheQuiz: {
    textAlign: 'center', // Center the text horizontally within the container
    lineHeight: 24, // Set the line height to match the height of the container
    backgroundColor: 'rgba(201, 162, 39, 1)',
    fontWeight: '400', // Use 'bold' instead of 400 for a bolder font weight
    fontSize: 18,
    width: 110,
    height: 24,
    borderRadius: 12, // Set half of the height to achieve a circular shape
    marginLeft: 270,
    marginTop: 200,
  },
  rectangle36: {
    backgroundColor: 'rgba(201, 162, 39, 1)',
    width: 103.5,
    height: 24,
    position: 'absolute',
    left: 249,
    top: 228,
  }, 
  rectangle4: {
    backgroundColor: 'rgba(217, 217, 217, 1)',
    width: 355,
    height: 150,
    position: 'absolute',
    left: 28,
    top: 60,
  },
  blogs: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    left: 33,
    top: 10,
  },
  rectangle5: {
    tintColor: 'rgba(237, 224, 212, 1)',
    width: 145,
    height: 139,
    position: 'absolute',
    left: 33,
    top: 287,
  },
  blogTitle1: {
    color: 'black',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15, 
    letterSpacing: 0,
    left: 34,
    top: 97,
  },
  BlogContainer: {
    width: 143, // Set a specific width for the container
    flexWrap: 'wrap', // Enable text wrapping
  },
  blogText1: {
    color: 'black',
    fontStyle: 'normal',
    fontWeight: '400',
    position: 'absolute',
    fontSize: 8,
    letterSpacing: 0,
    left: 35,
    top: 100,
  },
  blogTitle2: {
    color: 'black',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15, 
    letterSpacing: 0,
    left: 238,
    top: 80,
  },
  BlogContainer2: {
    width: 143, // Set a specific width for the container
    flexWrap: 'wrap', // Enable text wrapping
  },
  blogText2: {
    color: 'black',
    fontStyle: 'normal',
    fontWeight: '400',
    position: 'absolute',
    fontSize: 8,
    letterSpacing: 0,
    left: 238,
    top: 85,
  },
  rectangle6: {
    tintColor: 'rgba(237, 224, 212, 1)',
    width: 145,
    height: 139,
    position: 'absolute',
    right: 33,
    top: 287,
  },
  rectangle7: {
    tintColor: 'rgba(237, 224, 212, 1)',
    width: 348,
    height: 120,
    position: 'absolute',
    left: 33,
    top: 461,
  },
  inspiration: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    left: 33,
    top: 535,
  },
  rectangle8: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 91,
    height: 84,
    position: 'absolute',
    left: 33,
    top: 650,
  },
  rectangle9: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 91,
    height: 84,
    position: 'absolute',
    left: 162,
    top: 650,
  },
  rectangle10: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 91,
    height: 84,
    position: 'absolute',
    right: 33,
    top: 650,
  }, 
  productPage: {
    backgroundColor: 'orange',
    top: 60,
    width: 100,
    height: 30,
    fontSize: 24,
    marginLeft: 33,
    marginTop: 200,
  },
  Compass: {
    aspectRatio: 1.2,
    marginLeft: 35,
    marginTop: 15,
  },
  Compassword: {
    marginLeft: 30,
  },
  Barbershop: {
    aspectRatio: 1.2,
    marginLeft: 135,
    marginTop: -55,
  },
  Barbershopword: {
    marginLeft: 135,
    marginBottom: -40,
  },
  Community: {
    aspectRatio: 1.2,
    marginLeft: 235,
    marginTop: -55,
  },
  Communityword: {
    marginLeft: 225,
    marginBottom: -40,
  },
  User: {
    marginLeft: 335,
    marginTop: -55,
    aspectRatio: 1.2,
  },
  Userword: {
    marginLeft: 342,
    marginBottom: -40,
  },
  Bottonline: {
    width: 430,
    height: 149,
    flexShrink: 0,
    borderRadius: 39,
    borderWidth: 1,
    borderColor: '#472415',
    marginHorizontal: 30,
    marginBottom: -210,
  },
});