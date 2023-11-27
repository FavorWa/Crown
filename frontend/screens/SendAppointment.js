import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, Button, Modal } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { BACKEND_BASE_ANDROID, BACKEND_BASE_IOS } from '../secrets';
import AsyncStorage from '@react-native-async-storage/async-storage';


const backend_base_url = Platform.OS === 'android' ? BACKEND_BASE_ANDROID : BACKEND_BASE_IOS;


const StylistItem = ({ stylistName, onSelect, isSelected }) => {
  return (
    <TouchableOpacity onPress={onSelect}>
      <View
        style={{
          backgroundColor: isSelected ? '#E3A387' : 'transparent',
          borderRadius: 5,
          borderWidth: isSelected ? 2 : 0,  // Add border when stylist is selected
          borderColor: '#0000FF',  // Border color
          width: 70,
          height: 25,
          left: 33,
          top: -40,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20, top: -2 }}>{stylistName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SendAppointment = ({navigation}) => {
    const route = useRoute();
    const { business, stylist, service, price, date, time } = route.params;
    const stylistEmail = business.email;
    const [notice, setNotice] = useState('');
    const Price = price.toString();

    const send_request = async () => {
        const userEmail = await AsyncStorage.getItem('userEmail');
        fetch(`${backend_base_url}/send_appointment_request`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                stylistEmail: "sjz2025@bu.edu",
                userEmail: "sjz956230@gmail.com",
                stylist: stylist,
                service: service,
                price: Price,
                date: date,
                time: time,
                notice: notice,
            })
        })
        .then(response => response.json())
        .then(async data => {
        if (data.detail) {
            console.error('Error:', data.detail);
            console.log('stylistEmail:', stylistEmail);
            console.log('userEmail:', userEmail);
            console.log('stylist:', stylist);
            console.log('service:', service);
            console.log('price:', Price);
            console.log('date:', date);
            console.log('time:', time);
            console.log('notice:', notice);
        } else {
           console.log('all ok')
        }
        })
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
              source={require('../assets/cs1.png')}
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
              source={require('../assets/ba3.png')}
              style={{ height: 70, width: 100, left: 300, top: -156 }}  
            ></Image>

            <Text style={{ alignSelf: 'center', top: -110,fontSize: 22, fontWeight: '600'}}>Appointment Confirm</Text>

            <Text style={{ left: 33, fontSize: 20, fontWeight: '500', top: -60, color: '#C9A227' }}>Service</Text>
            <Text style={{ left: 33, fontSize: 18, top: -25}}>{service}</Text>
            <Text style={{ left: 320, fontSize: 18, top: -43}}>${price}</Text>
            <Text style={{ left: 33, fontSize: 20, fontWeight: '500', top: -20, color: '#C9A227'}}>Stylist</Text>
            <Text style={{ left: 33, fontSize: 18, top: 0}}>{stylist}</Text>
            <Text style={{ left: 33, fontSize: 20, fontWeight: '500', top: 30, color: '#C9A227'}}>Date & Time</Text>
            <Text style={{ left: 33, fontSize: 22, top: 50}}>{date}</Text>
            <Text style={{ left: 330, fontSize: 24, top: 20, color: 'orange'}}>{time}</Text>

            <Text style={{fontSize: 20, fontWeight:'bold', top: 60, left: 30}}>Notice</Text>
            <View style={{ padding: 2, borderWidth: 1, borderColor: '#8C8989', borderRadius: 8, top: 70, marginHorizontal: 30 }}>
                <TextInput
                    style={{fontSize: 16, backgroundColor: '#F9F3EE', height: 100,}}
                    multiline
                    placeholder="what else should the stylist know"
                    value={notice}
                    onChangeText={(text) => setNotice(text)}
                />
            </View>

            <TouchableOpacity onPress={() => send_request()}>
                <Text style={{ alignSelf: 'center', fontSize: 24, color: 'blue', fontWeight: '300', top: 90}}>Confirm Appointment</Text>
            </TouchableOpacity>
            {/* <Text style={{ top: 20 }}>{`Received parameters: ${stylistEmail}`}</Text> */}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

});

  export default SendAppointment


