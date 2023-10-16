import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Pressable, Image } from 'react-native';

export default function HomePage({ navigation }) {
  const onPressHandler = () => {
    navigation.navigate('HairQuiz');
    // navigation.replace('HairQuiz');
  }

  return(
    <View style={styles.container}>
      <Pressable
        onPress={onPressHandler}
      >
        <Text style={styles.hairquiz}>
          Hair Quiz
        </Text>
        <Image
          source={require('./assets/Rectangle4.png')}
          style={styles.rectangle4}
        ></Image>
        
        <Image 
          source={require('./assets/Rectangle4.png')}
          style={styles.rectangle36}
        ></Image>
        <Text style={styles.takeTheQuiz}>
          Take the Quiz
        </Text>
      </Pressable>
      
      <Text style={styles.blogs}>
        Blogs
      </Text>
      <Image
          source={require('./assets/Rectangle4.png')}
          style={styles.rectangle5}
      ></Image>
      <Image
          source={require('./assets/Rectangle4.png')}
          style={styles.rectangle6}
      ></Image>
      <Image
          source={require('./assets/Rectangle4.png')}
          style={styles.rectangle7}
      ></Image>
      <Text style={styles.blogTitle1}>
        Fall 2023 hairstyles
      </Text>
      {/* <Text sytle={styles.blogTitle1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </Text> */}

      <Text style={styles.inspiration}>
        Inspiration
      </Text>
      <Image
          source={require('./assets/Rectangle4.png')}
          style={styles.rectangle8}
      ></Image>
      <Image
          source={require('./assets/Rectangle4.png')}
          style={styles.rectangle9}
      ></Image>
      <Image
          source={require('./assets/Rectangle4.png')}
          style={styles.rectangle10}
      ></Image>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hairquiz: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    left: 33,
    top: 30,
  },
  takeTheQuiz: {
    textAlign: `left`,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: 400,
    fontSize: 14,
    letterSpacing: 0,
    width: 91,
    height: 22,
    position: `absolute`,
    left: 254,
    top: 230,
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
    width: 320,
    height: 170,
    position: 'absolute',
    left: 33,
    top: 55,
  },
  blogs: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    left: 33,
    top: 233,
  },
  rectangle5: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 145,
    height: 139,
    position: 'absolute',
    left: 33,
    top: 287,
  },
  blogTitle1: {
    color: 'rgba(0, 0, 0, 1)',
    fontStyle: 'normal',
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14, 
    letterSpacing: 0,
    textDecoration: 'none',
    textTransform: 'none',
    left: 33,
    top: 330,
  },
  blogText1: {
    color: 'rgba(0, 0, 0, 1)',
    fontStyle: 'normal',
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14, 
    letterSpacing: 0,
    textDecoration: 'none',
    textTransform: 'none',
    left: 33,
    top: 330,
  },
  rectangle6: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 145,
    height: 139,
    position: 'absolute',
    right: 40,
    top: 287,
  },
  rectangle7: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 320,
    height: 84,
    position: 'absolute',
    left: 33,
    top: 441,
  },
  inspiration: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    left: 33,
    top: 485,
  },
  rectangle8: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 91,
    height: 84,
    position: 'absolute',
    left: 33,
    top: 580,
  },
  rectangle9: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 91,
    height: 84,
    position: 'absolute',
    left: 147,
    top: 580,
  },
  rectangle10: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 91,
    height: 84,
    position: 'absolute',
    left: 262,
    top: 580,
  }, 
});
