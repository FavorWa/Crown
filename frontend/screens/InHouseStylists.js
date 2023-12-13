import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Avatar, Button, Card, Text, Searchbar} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectableImages } from './User';
import * as Location from 'expo-location';
import RNPickerSelect from 'react-native-picker-select';
import callApi from '../functions/callApi';
import { AirbnbRating } from 'react-native-ratings';
import BottomBar from '../components/BottomBar';


const InHouseStylists = ({navigation}) => {

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

    const [stylists, setStylists] = useState([]);
    const [filteredStylists, setFilteredStylists] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [Question, setQuestion] = useState('');
    const [userAvatar, setUserAvatar] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

    const fetchUserAvatar = async () => {
      const avatar = await AsyncStorage.getItem('userAvatar');
      setUserAvatar(avatar);
    };

    useEffect(() => {
      fetchUserAvatar();
    }, []);
    
    const setInhouseStylists = async () => {
        let stylistsData = await callApi('/stylists/inhouse');
        stylistsData = await Promise.all(
          stylistsData.map(async (stylist) => {
            const reviews = await callApi(`/stylists/inhouse/${stylist._id}/reviews`);
            const totalRating = reviews.reduce((sum, review) => sum + review.starsNum, 0);
            const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
            return {
              ...stylist,
              numReviews: reviews.length,
              averageRating: averageRating
            }
          })
        )
        setStylists(stylistsData);
        setFilteredStylists(stylistsData);
    }

    const handleSearch = () => {
    }

    const handleFilterPress = (filter) => {
      if (selectedFilters.includes(filter)) {
        setSelectedFilters(selectedFilters.filter((f) => f !== filter));
      } 
      else {
        setSelectedFilters([...selectedFilters, filter]);
      }
    };

    const filterStylists = () => {
      let filteredList = [...stylists]
      if (Question != "" && Question != null) {
        filteredList = filteredList.filter((stylist) => stylist.businessName.includes(Question))
      }

      if (selectedFilters.length > 0) {
        for (const filter of selectedFilters) {
          if (filter == "Protective Styles") {
            filteredList = filteredList.filter((stylist) => stylist.tags.includes("Protective Styles"))
          }
          if (filter == "1-3 Years of Experience") {
            filteredList = filteredList.filter((stylist) => stylist.yoe && stylist.yoe <= 3)
          }

          if (filter == "3-5 Years of Experience") {
            filteredList = filteredList.filter((stylist) => stylist.yoe && stylist.yoe > 3 && stylist.yoe <= 6)
          }

          if (filter == "7+ Years of Experience") {
            filteredList = filteredList.filter((stylist) => stylist.yoe && stylist.yoe >= 7)
          }

          if (filter == "4+ Stars") {
            filteredList = filteredList.filter((stylist) => stylist.averageRating >= 4)
          }
        }
      }

      return filteredList
    }

    const filterOptions = ["Protective Styles", "0-3 Years of Experience", "4-6 Years of Experience", "7+ Years of Experience", "4+ Stars"]


    useEffect(() => {
        setInhouseStylists()
    }, [])

    const renderBusinessCard = (business) => {
        return (
              <View style={styles.businessCardContainer}>
                <View style={styles.businessCardContent}>
                  <TouchableOpacity onPress={() => {navigation.navigate(`StylistProfile`, {"_id": business._id})}}>
                    <View style={styles.businessTitleLine}>
                        <View style={styles.leftCornerTitle}>
                          <Avatar.Image size={40} source={{uri: business.avatar}} />
                          <Text style={{marginLeft: 10, fontSize: 20, fontWeight: "bold"}}>{business.businessName}</Text>
                        </View>
                        <View style={styles.rightCornerTitle}>
                          <AirbnbRating defaultRating={business.averageRating} showRating={false} isDisabled size={14} selectedColor="#713200"/>
                          <Text style={{fontSize: 20}}>{business.numReviews} reviews</Text>
                        </View>
                      </View>

                      <View style={styles.businessBody}>
                        <Text style={{fontSize: 20}}>
                          {business.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View>
                      <ScrollView horizontal={true} >
                          {business.tags.map((tag) => {
                              return (
                                  <View style={styles.stylistFeatureContainer}>
                                      <Text style={styles.stylistFeature}>{tag}</Text>
                                  </View>
                              )
                          })}
                      </ScrollView>
                    </View>
                </View>
              </View>
        )
      };
    return (
        <SafeAreaView style={styles.container}>
          <View style={{ paddingHorizontal: 20}}>
            <Text style={styles.headline}>Crown Certified Stylists</Text>
            <Text style={styles.subtitle}>Experienced Hairstylists Verified by Us</Text>
          </View>
          
          <View style={{marginTop: 32, paddingHorizontal: 20}}>
            <Searchbar 
              placeholder="Search stylists"
              onChangeText={text => setQuestion(text)}
              value={Question}
              style={{backgroundColor: '#D9D9D9'}}
            />
          </View>

          <View style={styles.filterContainer}>          
            <ScrollView horizontal={true}>
              <View style={{width: 20}}></View>
              {
                filterOptions.map((filter) => {
                  return (
                    <TouchableOpacity
                    key={filter}
                    onPress={() => handleFilterPress(filter)}
                  >
                    <View style={[[
                      styles.textContainer,
                      selectedFilters.includes(filter) && styles.selectedFilter,
                    ]]}>
                      <Text style={styles.NearMe}>{filter}</Text>
  
                    </View>
                  </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>

          <View style={styles.StylistScroll}>
            <ScrollView>
            
              {stylists.length > 0 ? filterStylists().map((stylist) => {
                return renderBusinessCard(stylist);
              }) : null}
            </ScrollView>
          </View>
          <BottomBar navigation={navigation} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  businessCardContainer: {
    backgroundColor: '#EDE0D4', 
    borderRadius: 15,
    marginBottom: 20 
  },

  businessCardContent: {
    margin: 20
  },

  businessTitleLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },

  leftCornerTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rightCornerTitle: {
    display: "flex",
    alignItems: "center"
  },

  businessBody: {
    marginBottom: 20
  },
    Compass: {
      aspectRatio: 1.2,
      marginLeft: 75,
      marginTop: 15,
      opacity: 0.4,
    },
    Compassword: {
      marginLeft: 70,
      opacity: 0.4,
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
      marginLeft: 305,
      marginTop: -55,
      aspectRatio: 1.2,
    },
    Userword: {
      marginLeft: 308,
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
      marginBottom: 0,
    },
    avatar: {
      width: 55,
      height: 55,
      borderRadius: 40,
      marginLeft: 300,
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
    headline: {
      fontSize: 32,
      marginLeft: '5%'
    },
    subtitle: {
      fontSize: 18,
      color: '#713200',
      marginLeft: '5%'
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
      fontSize: 20,
    },
    filterContainer: {
      marginTop: 32,
    },
    textContainer: {
      backgroundColor: '#E3A387', // Change this to your desired background color
      borderRadius: 10, // Border radius of the container
      alignContent: 'center',
      marginHorizontal: 5,
      paddingHorizontal: 16
    },
    NearMe: {
      color: 'black',
      fontSize: 20
    },

    selectedFilter: {
      borderColor: 'black',
      borderWidth: 2,
    },
    emptyContainer: {
      tintColor: 'white', 
      width: 40,
    },
    StylistScroll: {
      marginTop: 32,
      paddingHorizontal: 20
    },
    mainScroll: {
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    stylistFeatureContainer: {
      backgroundColor: '#E3A387', // Change this to your desired background color
      borderRadius: 10, // Border radius of the container
      alignContent: 'center',
      paddingHorizontal: 5,
      marginRight: 5
    },
    stylistFeature: {
      fontSize: 20,
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

  export default InHouseStylists