import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Pressable, Image } from 'react-native';

export default function HomePage({ navigation }) {
  const onPressHandler = () => {
    navigation.navigate('HairQuiz');
    // navigation.replace('HairQuiz');
  }

  return(
    <View>
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
  hairquiz: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    left: 33,
    top: 30,
  },
  crownTextMargin: {
    marginTop: -200,
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
    top: 213,
  },
  rectangle5: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 145,
    height: 139,
    position: 'absolute',
    left: 33,
    top: 263,
  },
  rectangle6: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 145,
    height: 139,
    position: 'absolute',
    right: 40,
    top: 263,
  },
  rectangle7: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 320,
    height: 84,
    position: 'absolute',
    left: 33,
    top: 417,
  },
  inspiration: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    left: 33,
    top: 470,
  },
  rectangle8: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 91,
    height: 84,
    position: 'absolute',
    left: 33,
    top: 544,
  },
  rectangle9: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 91,
    height: 84,
    position: 'absolute',
    left: 147,
    top: 544,
  },
  rectangle10: {
    backgroundColor: `rgba(217, 217, 217, 1)`,
    width: 91,
    height: 84,
    position: 'absolute',
    left: 262,
    top: 544,
  },
});
