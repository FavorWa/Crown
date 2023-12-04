import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { BACKEND_BASE_ANDROID, BACKEND_BASE_IOS } from '../secrets';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backend_base_url = Platform.OS === 'android' ? BACKEND_BASE_ANDROID : BACKEND_BASE_IOS;


const BookAppointment = ({navigation}) => {
    const route = useRoute();
    const { business } = route.params;
    const stylistEmail = business.email;

    const [userName, setUserName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const fetchUserAvatar = async () => {
      const avatar = await AsyncStorage.getItem('userAvatar');
      const userName = await AsyncStorage.getItem('userName');
      const currentUserEmail = await AsyncStorage.getItem('userEmail');
      setUserAvatar(avatar);
      setUserName(userName);
      setUserEmail(currentUserEmail);
    };


    const [serviceNames, setServiceNames] = useState([]);
    const [serviceSizes, setServiceSizes] = useState([]);
    const [servicePrices, setServicePrices] = useState([]);
    const getServices = () => {
      fetch(`${backend_base_url}/get_stylist_service`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: stylistEmail,
        })
      })
        .then(response => response.json())
        .then(async data => {
          if (data.detail) {
            console.error('Error:', data.detail); // Log the error if there is one
          } else {
            setServiceNames(data.service_names || []);
            setServiceSizes(data.service_sizes || []);
            setServicePrices(data.service_prices || []);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    useEffect(() => {
      getServices();
      fetchUserAvatar();
    }, []);

    
    const [selectedService, setSelectedService] = useState(null);
    const handleServicePress = (index) => {
      // Toggle the selected service
      setSelectedService(selectedService === index ? null : index);
    };
    const ServiceList = ({ serviceNames, serviceSizes, servicePrices }) => {
      return (
        <View>
          {serviceNames.map((serviceName, index) => (
            <View>
              <TouchableOpacity
                key={index}
                onPress={() => handleServicePress(index)}
                style={{
                  backgroundColor: selectedService === index ? '#E3A387' : 'transparent',
                  borderRadius: 20, // Border radius of the container
                  width: 350,
                  height: 40,
                  marginBottom: 10, // Adjusted margin
                }}
              >
                <ScrollView horizontal style={{ width: 240, top: 10, left: 5 }}>
                  <Text>{serviceName}</Text>
                </ScrollView>
                <Text style={{ top: -10, left: 310, width: 40}}>{'$' + servicePrices[index]}</Text>
                </TouchableOpacity>
                <View style={{ top: -13, left: 5 }}>
                  {serviceSizes[index] !== null ? (
                    <Text style={{ fontWeight: '700' }}>{serviceSizes[index]}</Text>
                  ) : (
                    <Text>&nbsp;</Text>
                  )}
                </View>
              </View>
            ))}
        </View>
      );
    };

     

    return (
        <SafeAreaView style={styles.container}>

            <Text style={{ fontSize: 28, fontWeight: '600', alignSelf: 'center'}}> Book an Appointment </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/gobackIcon.png')}
                style={{ height: 40, width: 40, top: -37, left: 2}}
              ></Image>
            </TouchableOpacity>
            
            <Image
              source={require('../assets/chooseService.png')}
              style={{ height: 70, width: 60, left: 25 }}  
            ></Image>
            <Image
              source={require('../assets/dots.png')}
              style={{ height: 10, width: 40, left: 90, top: -30 }}  
            ></Image>
            <Image
              source={require('../assets/chooseDateTime.png')}
              style={{ height: 70, width: 110, left: 145, top: -77 }}  
            ></Image>
            <Image
              source={require('../assets/dots.png')}
              style={{ height: 10, width: 40, left: 260, top: -110 }}  
            ></Image>
            <Image
              source={require('../assets/BookanAppointment.png')}
              style={{ height: 70, width: 100, left: 300, top: -156 }}  
            ></Image>

            <Text style={{ alignSelf: 'center', top: -110,fontSize: 25, fontWeight: '600'}}>Choose Your Service(s)</Text>
            <Text style={{  left: 33, top: -60,fontSize: 20, fontWeight: '600'}}>All Services</Text>
            <TouchableOpacity>
              <Image
                source={require('../assets/SearchIcon.png')}
                style={{ height: 35, width: 35, left: 330, top: -80 }}  
              ></Image>
            </TouchableOpacity>

            <ScrollView style={{ height: 250, top: -50, left: 33}}>
              <ServiceList serviceNames={serviceNames} serviceSizes={serviceSizes} servicePrices={servicePrices} />
            </ScrollView>

            {selectedService !== null && (
              <TouchableOpacity onPress={() => navigation.navigate('ChooseDate', { business: business, service: serviceNames[selectedService], price: servicePrices[selectedService] })}>
                <View style={{backgroundColor: '#E3A387', borderRadius: 15, width: 70, height: 25, left: 320, top: -40, alignItems: 'center'}}>
                  <Text style={{fontSize: 20, top: 0}}>Next</Text>
                </View>
              </TouchableOpacity>
            )}

            {/* <Text style={{ top: 0 }}>{`Received parameters: ${stylistEmail}`}</Text> */}

            <TouchableOpacity onPress={() => navigation.navigate('ChatBox', { stylistEmail: stylistEmail, stylistName: business.stylistName, stylistAvatar: business.avatar, userName: userName, userAvatar: userAvatar, userEmail: userEmail })}>
              <Text style={{ alignSelf: 'center', top: -200, fontSize: 20, fontWeight: '500', color: '#E3A387'}}>Talk to stylist?</Text>
            </TouchableOpacity>

            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  });

  export default BookAppointment