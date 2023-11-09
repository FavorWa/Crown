import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectableImages } from './User';


export default function Stylist({ navigation }) {

  const [userAvatar, setUserAvatar] = useState(null);
  const fetchUserAvatar = async () => {
      const avatar = await AsyncStorage.getItem('userAvatar');
      setUserAvatar(avatar);
    
  };

  useEffect(() => {
    fetchUserAvatar();
  }, []);

  const [Question, setQuestion] = useState('');
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.findastylist}> Find a Stylist </Text>
          <Text style={styles.secondLine}> We'll help you find the perfect match. </Text>
          
          <Image
            source={require('../assets/Rectangle4.png')}
            style={styles.searchBox}
          ></Image>
          <Image
            source={require('../assets/SearchIcon.png')}
            style={styles.searchIcon}
          ></Image>
          <TextInput style={styles.SearchInput}
            placeholder='Search for hairstylists and services'
            placeholderTextColor='#111010'
            keyboardType='web-search'
            keyboardAppearance='default'
            maxLength={120}
            onChangeText={text => setQuestion(text)}
            value={Question}
          ></TextInput>

          <View style={styles.filterContainer}>
            <ScrollView horizontal={true} >
              <View style={styles.textContainer}>
                <Text style={styles.NearMe}> Near Me </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.NearMe}> Protective Styles </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.NearMe}> 4 stars </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.NearMe}> Fair Pricing </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.NearMe}> Mask Required </Text>
              </View>
              <Image
                source={require('../assets/Rectangle4.png')}
                style={styles.emptyContainer}
              ></Image>
            </ScrollView>
          </View>

          <View style={styles.StylistScroll}>
            <ScrollView style={styles.mainScroll}>
              <Card style={{ backgroundColor: '#EDE0D4', borderRadius: 15, marginBottom: 20 }}>
                  <Card.Title titleStyle={styles.cardTitle} title="Kiki's Salon"  left={LeftContent} />
                  <Image source={require('../assets/fourStarReview.png')} style={{ width: 74, height: 15, top: -50, left: 250 }} />
                
                  <Card.Content>
                    <Text variant="bodyMedium">
                      Hello! My name is Kiki and I am an independent salon owner and professional stylist. 
                      I specialize in chemical treatments including texturizing... see more
                    </Text>
                  
                    <View style={{ height: 30, top: 10 }}>
                      <ScrollView horizontal={true} >
                        <View style={styles.stylistFeatureContainer}>
                          <Text style={styles.stylistFeature}>  highly skilled  </Text>
                        </View>
                        <View style={styles.stylistFeatureContainer}>
                          <Text style={styles.stylistFeature}>  fair price  </Text>
                        </View>
                        <View style={styles.stylistFeatureContainer}>
                          <Text style={styles.stylistFeature}>  mask required  </Text>
                        </View>
                        <View style={styles.stylistFeatureContainer}>
                          <Text style={styles.stylistFeature}>  5+ year of experience  </Text>
                        </View>
                      </ScrollView>
                    </View>
                  </Card.Content>

                    <Image
                      source={require('../assets/dollarSign.png')}
                      style={styles.price}
                    ></Image>
                    <Text style={styles.distance}>
                      2.6 miles away
                    </Text>
                    
                    <Card.Actions style={{ top: -20, marginBottom: -10 }}>
                      <TouchableOpacity>
                        <View style={styles.BAContainer}>
                          <Text style={styles.BookAppointment}>  Book an appointment  </Text>
                        </View>
                      </TouchableOpacity>
                    </Card.Actions>
                  
              </Card>

              <Card style={{ backgroundColor: '#EDE0D4', borderRadius: 15, marginBottom: 20 }}>
                  <Card.Title titleStyle={styles.cardTitle} title="Waves by Nisha"  left={LeftContent} />
                  <Image source={require('../assets/fourStarReview.png')} style={{ width: 74, height: 15, top: -50, left: 250 }} />
                
                  <Card.Content>
                    <Text variant="bodyMedium">
                    Waves by Nisha is a beauty bar based in downtown Miami. We work with all hair types 
                    and prioritize customer care! Get you hair styled by the best... see more
                    </Text>
                  
                    <View style={{ height: 30, top: 10 }}>
                      <ScrollView horizontal={true} >
                        <View style={styles.stylistFeatureContainer}>
                          <Text style={styles.stylistFeature}>  4c hair  </Text>
                        </View>
                        <View style={styles.stylistFeatureContainer}>
                          <Text style={styles.stylistFeature}>  box braids  </Text>
                        </View>
                        <View style={styles.stylistFeatureContainer}>
                          <Text style={styles.stylistFeature}>  passion twists  </Text>
                        </View>
                        <View style={styles.stylistFeatureContainer}>
                          <Text style={styles.stylistFeature}>  3+ year of experience  </Text>
                        </View>
                      </ScrollView>
                    </View>
                  </Card.Content>

                    <Image
                      source={require('../assets/dollarSign.png')}
                      style={styles.price}
                    ></Image>
                    <Text style={styles.distance}>
                      3.0 miles away
                    </Text>
                    
                    <Card.Actions style={{ top: -20, marginBottom: -10 }}>
                      <TouchableOpacity>
                        <View style={styles.BAContainer}>
                          <Text style={styles.BookAppointment}>  Book an appointment  </Text>
                        </View>
                      </TouchableOpacity>
                    </Card.Actions>
                  
              </Card>
              
              <Card style={{ backgroundColor: '#EDE0D4', borderRadius: 15, marginBottom: 20 }}>
                  <Card.Title titleStyle={styles.cardTitle} title="SaraJade"  left={LeftContent} />
                  <Image source={require('../assets/threeStarReview.png')} style={{ width: 74, height: 15, top: -50, left: 250 }} />
                
                  <Card.Content>
                    <Text variant="bodyMedium">
                    Hi, I’m Jade and I own a beauty salon in Miami Gardens with my partner Sara. 
                    We are licensed professionals and value customer service. Our... see more
                    </Text>
                  
                    <View style={{ height: 30, top: 10 }}>
                      <ScrollView horizontal={true} >
                        <View style={styles.stylistFeatureContainer}>
                          <Text style={styles.stylistFeature}>  4c hair  </Text>
                        </View>
                        <View style={styles.stylistFeatureContainer}>
                          <Text style={styles.stylistFeature}>  box braids  </Text>
                        </View>
                        <View style={styles.stylistFeatureContainer}>
                          <Text style={styles.stylistFeature}>  passion twists  </Text>
                        </View>
                        <View style={styles.stylistFeatureContainer}>
                          <Text style={styles.stylistFeature}>  3+ year of experience  </Text>
                        </View>
                      </ScrollView>
                    </View>
                  </Card.Content>

                    <Image
                      source={require('../assets/dollarSign.png')}
                      style={styles.price}
                    ></Image>
                    <Text style={styles.distance}>
                      3.0 miles away
                    </Text>
                    
                    <Card.Actions style={{ top: -20, marginBottom: -10 }}>
                      <TouchableOpacity>
                        <View style={styles.BAContainer}>
                          <Text style={styles.BookAppointment}>  Book an appointment  </Text>
                        </View>
                      </TouchableOpacity>
                    </Card.Actions>
                  
              </Card>
            </ScrollView>
          </View>

          


          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', bottom: 250 }}>
              <View style={styles.Bottonline}> 
                <TouchableOpacity onPress={() => navigation.replace('Homepage')}>
                <Image
                  source={require('../assets/Compass.png')}
                  style={styles.Compass}
                ></Image>
                <Text style={styles.Compassword}>Discover</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => navigation.navigate('Stylist')}>
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

              <TouchableOpacity onPress={() => navigation.replace('User')}>
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
    );
}

const styles = StyleSheet.create({
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
    marginLeft: 338,
    marginBottom: -40,
  },
  Bottonline: {
    width: 430,
    height: 210,
    flexShrink: 0,
    borderRadius: 39,
    borderWidth: 1,
    borderColor: '#472415',
    marginHorizontal: 30,
    marginBottom: -210,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 40,
    marginLeft: 330,
    marginVertical: -55,
  },
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
  findastylist: {
    fontSize: 35,
    width: 246,
    height: 40,
    top: 10,
    left: 23,
  },
  secondLine: {
    fontSize: 18,
    width: 317,
    height: 20,
    top: 15,
    left: 25,
    color: '#713200',
  },
  searchBox: {
    tintColor: '#D9D9D9',
    width: 355,
    height: 40,
    borderRadius: 20,
    left: 28,
    top: 50,
  },
  searchIcon: {
    width: 28,
    height: 28,
    left: 35,
    top: 17,
  },
  SearchInput: {
    top: -17,
    left: 30,
    width: 330,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    fontSize: 14,
  },
  filterContainer: {
    left: 33,
    // width: 500,
    height: 24,
  },
  textContainer: {
    backgroundColor: '#E3A387', // Change this to your desired background color
    borderRadius: 10, // Border radius of the container
    alignContent: 'center',
    marginHorizontal: 5,
  },
  NearMe: {
    top: 2,
    fontSize: 16,
    color: 'black',
  },
  emptyContainer: {
    tintColor: 'white', 
    width: 40,
  },
  StylistScroll: {
    marginHorizontal: 33,
    top: 50,
    marginBottom: 80,
  },
  mainScroll: {
    marginBottom: 220,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  stylistFeatureContainer: {
    backgroundColor: '#E3A387', // Change this to your desired background color
    borderRadius: 10, // Border radius of the container
    alignContent: 'center',
    marginHorizontal: 5,
    height: 20,
  },
  stylistFeature: {
    top: 2,
    fontSize: 12,
    color: 'black',
  },
  BAContainer: {
    backgroundColor: '#C9A227', // Change this to your desired background color
    borderRadius: 15, // Border radius of the container
    alignContent: 'center',
    marginHorizontal: 5,
    height: 30,
  },
  BookAppointment: {
    top: 4,
    fontSize: 16,
    color: '#472415',
  },
  price: {
    top: 24,
    left: 13,
    aspectRatio: 1.5,
  },
  distance: {
    color: '#242424',
    top: 10,
    left: 40,
  },
});