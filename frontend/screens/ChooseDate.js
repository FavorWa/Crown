import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, Button, Modal } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { BACKEND_BASE_ANDROID, BACKEND_BASE_IOS } from '../secrets';
import {Calendar, LocaleConfig, CalendarList, Agenda} from 'react-native-calendars';


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

const ChooseDate = ({navigation}) => {
    const route = useRoute();
    const { business, selectedService } = route.params;
    const stylistEmail = business.email;
    const stylistName = business.stylistName;
    const businessHours = business.businessHours;

    const [selectedStylist, setSelectedStylist] = useState(stylistName);
    const handleStylistSelect = (stylistName) => {
      setSelectedStylist(stylistName);
    };
    const stylistNames = [stylistName];

    const [selectedDate, setSelectedDate] = useState('');
    const [closed, setClosed] = useState(false);
    const [dayIndex, setDayIndex] = useState('');
    const isBusinessClosed = (index) => {
      if (businessHours[index] === 'Closed') {
        setClosed(true);
      } else {
        setClosed(false);
      }
    };

    const [userEnteredTime, setUserEnteredTime] = useState('');
    const [placeholderText, setPlaceholderText] = useState('');
    const handleTimeInputChange = (text) => {
      setUserEnteredTime(text);
    };
  
    const handleAppointmentConfirmation = () => {
      // Validate the user-entered time
      if (validateUserEnteredTime(userEnteredTime, businessHours[dayIndex])) {
        // Handle the logic to confirm the appointment with the selected date and time
        // ...
        console.log('Appointment confirmed for', userEnteredTime);
      } else {
        // Display an error message or handle the case where the time is not valid
        console.log('Invalid time entered.');
      }
    };
  
    const validateUserEnteredTime = (userTime, businessHours) => {
      // Validate if the entered time is within the business hours range
      // You may need to implement a more sophisticated parsing and validation logic
      // based on your business hours format
      return true; // Placeholder validation, replace with your logic
    };
  
    // Effect to update placeholder text when selectedDate or dayIndex changes
    useEffect(() => {
      if (selectedDate !== '' && !closed) {
        setPlaceholderText(`Enter time between ${businessHours[dayIndex]}`);
      }
    }, [selectedDate, closed, dayIndex]);



    return (
        <SafeAreaView style={styles.container}>

            <Text style={{ fontSize: 28, fontWeight: '600', alignSelf: 'center'}}> Booking an Appointment </Text>
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
              source={require('../assets/cdt2.png')}
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

            <Text style={{ alignSelf: 'center', top: -110,fontSize: 22, fontWeight: '600'}}>Choose a Stylist, Date, and Time</Text>
            <Text style={{  left: 33, top: -60,fontSize: 20, fontWeight: '600'}}>Stylists</Text>

            <View>
              {stylistNames.map((stylistName) => (
                <StylistItem
                  key={stylistName}
                  stylistName={stylistName}
                  onSelect={() => handleStylistSelect(stylistName)}
                  isSelected={selectedStylist === stylistName}
                />
              ))}
            </View>

            <CalendarList
              current={new Date()}
              minDate={new Date()} // Set the minimum selectable date to today
              pastScrollRange={0}
              futureScrollRange={2}
              horizontal
              pagingEnabled
              onDayPress={(day) => {
                const selectedDate = new Date(day.dateString);
                selectedDate.setHours(selectedDate.getHours() + 6);
                setSelectedDate(day.dateString);
                const updatedDayIndex = selectedDate.getDay();
                setDayIndex(updatedDayIndex);
                isBusinessClosed(updatedDayIndex);
              }}
              markedDates={{
                [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
              }}
            />



            <View style={{flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: -30}}>
              {selectedDate !== '' && !closed ? (
                <View>
                  <Text>Please enter a time Ex. 14:30</Text>
                  {/* TextInput for user to enter a time */}
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: 'gray',
                      borderWidth: 1,
                      marginBottom: 10,
                      paddingHorizontal: 10,
                    }}
                    placeholder={placeholderText}
                    value={userEnteredTime}
                    onChangeText={handleTimeInputChange}
                    keyboardType="numeric"
                    onKeyPress={(e) => {
                      // Allow only numbers and a single colon
                      const validCharacters = '0123456789:';
                      if (e.nativeEvent.key && validCharacters.indexOf(e.nativeEvent.key) === -1) {
                        e.preventDefault();
                      }
                    }}
                  />

                  {/* Button to confirm the appointment */}
                  <Button
                    title="Confirm Appointment"
                    onPress={handleAppointmentConfirmation}
                  />
                </View>
              ) : (
                <Text>Business is closed on the selected date.</Text>
              )}
            </View>

            
            {/* <Text style={{ top: 0 }}>{`Received parameters: ${stylistEmail}`}</Text> */}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

});

  export default ChooseDate


