import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectableImages } from './User';
import * as Location from 'expo-location';
import RNPickerSelect from 'react-native-picker-select';
import { BACKEND_BASE_IOS, BACKEND_BASE_ANDROID } from '../secrets';

const backend_base_url = Platform.OS === 'android' ? BACKEND_BASE_ANDROID : BACKEND_BASE_IOS;

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

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
          accuracy: Location.Accuracy.High,
        });
        setLocation(location);

        if (await AsyncStorage.getItem('YelpData') !== null){
          const parsedData = JSON.parse(await AsyncStorage.getItem('YelpData'));
          setYelpData(parsedData);
        }
        
      })();
    }, []);

  // if(location){console.log(location)}
  const metersToMiles = (distanceInMeters) => {
    const miles = distanceInMeters * 0.000621371; // 1 meter = 0.000621371 miles
    return miles.toFixed(1); // Format to one decimal place
  };

  const [range, setRange] = useState(2);
  const [YelpData, setYelpData] = useState([]);
  const handleSearch = async () => {
    const email = await AsyncStorage.getItem('userEmail');
    fetch(`${backend_base_url}/get_barbershop_from_yelp_api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        request: Question,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        range: range,
      })
    })
      .then(response => response.json())
      .then( async data => {
        // console.log(data);
        // Handle the response data here
        if (data.detail) {
          console.error('Error:', data.detail); // Log the error if there is one
        } else {
          await AsyncStorage.setItem('YelpData', JSON.stringify(data));
          const parsedData = JSON.parse(await AsyncStorage.getItem('YelpData'));
          setYelpData(parsedData);
          // console.log('result within range', range);
          // console.log(YelpData);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const renderBusinessCard = (business, index) => {
    return (
      <Card key={index} style={{ backgroundColor: '#EDE0D4', borderRadius: 15, marginBottom: 20 }}>
        {/* <Card.Title titleStyle={styles.cardTitle} title={business.name} left={LeftContent} /> */}
        <ScrollView horizontal style={{ width: 230 }}>
          <Card.Title titleStyle={styles.cardTitle} title={business.name} left={LeftContent} />
        </ScrollView>

        <Image source={require('../assets/fourStarReview.png')} style={{ width: 74, height: 15, top: -50, left: 250 }} />
        {/* Add other information or customization for each business */}
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

        <Text style={{ left: 24, top: 28 }}>{business.price}</Text>
        <Text style={{ color: '#242424', top: 10, marginLeft: 60, }}>
          {metersToMiles(business.distance)} miles
        </Text>
        
        <Card.Actions style={{ top: -20, marginBottom: -10 }}>
          <TouchableOpacity>
            <View style={styles.BAContainer}>
              <Text style={styles.BookAppointment}>  Book an appointment  </Text>
            </View>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    );
  };
  //console.log(YelpData);

  return (
        <SafeAreaView style={styles.container}>
          <View style={{ height: 50 }}>
            <Text style={styles.findastylist}> Find a Salon</Text>
            <Text style={{ top: -30, left: 220, color: 'green', fontSize: 35, fontWeight: 'bold' }}>/</Text>
            <TouchableOpacity onPress={() => navigation.navigate('InHouseStylists')}>
              <Text style={{ left: 240, fontSize: 34, color: 'red', top: -70 }}>Stylist </Text>
            </TouchableOpacity>
          </View>
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
            enterKeyHint='search'
            onSubmitEditing={handleSearch}
          ></TextInput>
          <Text style={{ left: 350, top: -80, }}>Km</Text>
          <View style={{ top: -65, left: 355 }}>
            <RNPickerSelect
              onValueChange={(value) => setRange(value)}
              placeholder={{
                label: '0',
                value: 0, // or whatever value should be used for the placeholder
              }}
              items={Array.from({ length: 15 }, (_, index) => ({ label: `${index + 1}`, value: index + 1 }))}
              style={{
                inputIOS: {
                  fontSize: 18,
                  color: 'purple',
                },
                inputAndroid: {
                  // Your Android styles here
                },
              }}
            />
          </View>

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

              {YelpData && YelpData.length > 0 ? (
                YelpData.map((business, index) => renderBusinessCard(business, index))
              ) : (
                <Text>Try your first search</Text>
              )}
              
            </ScrollView>
          </View>

          


          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', bottom: 290 }}>
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
    left: 65,
    width: 260,
    height: 40,
    borderRadius: 5,
    fontSize: 14,
  },
  filterContainer: {
    left: 33,
    top: -35,
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
    marginBottom: 80,
  },
  mainScroll: {
    marginBottom: 210,
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
});