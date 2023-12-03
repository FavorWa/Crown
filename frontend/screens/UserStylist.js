import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Button, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

export const selectableImages = {
  'avatar1': require('../assets/avatar1.png'),
  'avatar2': require('../assets/avatar2.png'),
  'avatar3': require('../assets/avatar3.png'),
  'avatar4': require('../assets/avatar4.png'),
  'avatar5': require('../assets/avatar5.png'),
  'avatar6': require('../assets/avatar6.png'),
  'avatar7': require('../assets/avatar7.png'),
  'avatar8': require('../assets/avatar8.png')
};
const Nums = [
  'avatar1',
  'avatar2',
  'avatar3',
  'avatar4',
  'avatar5',
  'avatar6',
  'avatar7',
  'avatar8'
];
const StartTime =[
    {label: 'closed' , value: 'closed'},
    {label: '8:00 AM' , value: '8:00 AM'},
    {label: '8:30 AM' , value: '8:30 AM'},
    {label: '9:00 AM' , value: '9:00 AM'},
    {label: '9:30 AM' , value: '9:30 AM'},
    {label: '10:00 AM' , value: '10:00 AM'},
    {label: '10:30 AM' , value: '10:30 AM'},
    {label: '11:00 AM' , value: '11:00 AM'},
    {label: '11:30 AM' , value: '11:30 AM'},
    {label: '12:00 AM' , value: '12:00 AM'},
];
const EndTime =[
    {label: 'closed', value: 'closed'},
    {label: '12:00 PM', value: '12:00 PM'},
    {label: '12:30 PM', value: '12:30 PM'},
    {label: '1:00 PM', value: '1:00 PM'},
    {label: '1:30 PM', value: '1:30 PM'},
    {label: '2:00 PM', value: '2:00 PM'},
    {label: '2:30 PM', value: '2:30 PM'},
    {label: '3:00 PM', value: '3:00 PM'},
    {label: '3:30 PM', value: '3:30 PM'},
    {label: '4:00 PM', value: '4:00 PM'},
    {label: '4:30 PM', value: '4:30 PM'},
    {label: '5:00 PM', value: '5:00 PM'},
    {label: '5:30 PM', value: '5:30 PM'},
    {label: '6:00 PM', value: '6:00 PM'},
    {label: '6:30 PM', value: '6:30 PM'},
    {label: '7:00 PM', value: '7:00 PM'},
    {label: '7:30 PM', value: '7:30 PM'},
    {label: '8:00 PM', value: '8:00 PM'},
    {label: '8:30 PM', value: '8:30 PM'},
    {label: '9:00 PM', value: '9:00 PM'},
    {label: '9:30 PM', value: '9:30 PM'},
    {label: '10:00 PM', value: '10:00 PM'},
    {label: '10:30 PM', value: '10:30 PM'},
];

export default function DrawerExample({ navigation }) {
    const [userName, setuserName] = useState('');
    const [userId, setuserId] = useState('');    
    const [userAvatar, setUserAvatar] = useState(null);

    useEffect(() => {
      const fetchUserAvatar = async () => {
        const avatarUrl = await AsyncStorage.getItem('userAvatar').catch(error => {
          console.error('Error fetching user avatar:', error);
        });
        if (avatarUrl) {
          setUserAvatar(await AsyncStorage.getItem('userAvatar'));
          setuserName(await AsyncStorage.getItem('userName'));
          setuserId(await AsyncStorage.getItem('userId'));
        }
      };
  
      fetchUserAvatar();
    }, []);
    
    const [stylistTags, setStylistTags] = useState(['Tag1', 'Tag2']); // Your initial tags
    const [newTagText, setNewTagText] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [tapCount, setTapCount] = useState(0);
    const [lastTapTime, setLastTapTime] = useState(0);

    const addStylistTag = () => {
        if (newTagText.trim() !== '') {
        setStylistTags([...stylistTags, newTagText.trim()]);
        }
    };

    const deleteStylistTag = (index) => {
        const newStylistTags = [...stylistTags];
        newStylistTags.splice(index, 1);
        setStylistTags(newStylistTags);
    };

    const handleTagPress = (index) => {
        const now = Date.now();

        // Check if it's the first tap or the second tap within 0.5 seconds
        if (tapCount === 0 || now - lastTapTime <= 500) {
        setTapCount(tapCount + 1);

        // If it's the second tap, delete the tag
        if (tapCount === 1) {
            deleteStylistTag(index);
            setTapCount(0);
        }
        } else {
        // Reset the counter if the time between taps is greater than 0.5 seconds
        setTapCount(1);
        }

        // Update the timestamp of the last tap
        setLastTapTime(now);
    };

    const [Bio, setBio] = useState('');

    const [SundayStart, setSundayStart] = useState('null');
    const [SundayEnd, setSundayEnd] = useState('null');
    const [MondayStart, setMondayStart] = useState('null');
    const [MondayEnd, setMondayEnd] = useState('null');
    const [TuesdayStart, setTuesdayStart] = useState('null');
    const [TuesdayEnd, setTuesdayEnd] = useState('null');
    const [WednesdayStart, setWednesdayStart] = useState('null');
    const [WednesdayEnd, setWednesdayEnd] = useState('null');
    const [ThursdayStart, setThursdayStart] = useState('null');
    const [ThursdayEnd, setThursdayEnd] = useState('null');
    const [FridayStart, setFridayStart] = useState('null');
    const [FridayEnd, setFridayEnd] = useState('null');
    const [SaturdayStart, setSaturdayStart] = useState('null');
    const [SaturdayEnd, setSaturdayEnd] = useState('null');
    
    const [service, setService] = useState('');
    const [price, setPrice] = useState('');

    const [services, setServices] = useState([{ name: '', price: '' }]);
    const [inputText, setInputText] = useState('');

    const updateService = (index, key, value) => {
        const newServices = [...services];
        newServices[index][key] = value;
        setServices(newServices);
    };
    const addServiceInput = () => {
        setServices([...services, { name: '', price: '' }]);
    };
    const deleteService = (index) => {
        const newServices = [...services];
        newServices.splice(index, 1);
        setServices(newServices);
    };

    const saveProfile = async () => {
        const email = await AsyncStorage.getItem('userEmail');
        fetch('http://localhost:8000/saveStylistProfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            tags: stylistTags,
            bio: Bio,
            businessHours: {
                Sunday: { start: SundayStart, end: SundayEnd },
                Monday: { start: MondayStart, end: MondayEnd },
                Tuesday: { start: TuesdayStart, end: TuesdayEnd },
                Wednesday: { start: WednesdayStart, end: WednesdayEnd },
                Thursday: { start: ThursdayStart, end: ThursdayEnd },
                Friday: { start: FridayStart, end: FridayEnd },
                Saturday: { start: SaturdayStart, end: SaturdayEnd },
              },
            services: services,
          })
        })
          .then(response => response.json())
          .then( async data => {
            if (data.detail) {
              console.error('Error:', data.detail); // Log the error if there is one
            } else {
              console.log('seems correct');
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.replace('User')} style={{ marginTop: 40, marginLeft: 33 }}>
                <Image source={require('../assets/gobackIcon.png')} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
            
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft: 40 }}>
                <Image source={selectableImages[userAvatar]} style={{ width: 75, height: 75, borderRadius: 40 }} />
                <View style={{ marginLeft: 20 }}>
                    <ScrollView horizontal>
                        <Text style={{ color: '#1E1E1E', fontSize: 30, fontWeight: '400', top: 20 }}>{userName}</Text>
                        <TouchableOpacity>
                        <Image source={require('../assets/renameIcon.png')} style={{ width: 30, height: 30, left: 10, top: 25 }} />
                        </TouchableOpacity>
                        <View style={{ width: 40, marginLeft: 40 }}></View>
                    </ScrollView>
                </View>
                </View>

                <TouchableOpacity>
                    <Text style={{ color: '#1E1E1E99', marginLeft: 45, top: 5 }}>add photo</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Image source={require('../assets/dollarSign.png')} style={{ width: 14, height: 20, left: 130, top: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ color: '#31313199', left: 190, top: 20, fontSize: 14, fontWeight: 'bold'}}>Location</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#31313199', left: 220, top: 20, fontSize: 14, fontWeight: 'bold'}}>No reviews yet</Text>
                    <Image source={require('../assets/emptystarview.png')} style={{ width: 100, height: 20, left: 120, top: -20 }} />
                </View>

                <View style={{ left: 33, top: 35, height: 24 }}>
                    <ScrollView horizontal={true}>
                        {stylistTags.map((tag, index) => (
                            <TouchableOpacity key={index} onPress={() => handleTagPress(index)}>
                                <View style={{ backgroundColor: '#E3A387', borderRadius: 8, alignContent: 'center', marginHorizontal: 5 }}>
                                    <Text style={{ marginHorizontal: 4, marginVertical: 2, fontSize: 16, color: 'black' }}>{tag}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <View style={{ alignContent: 'center', marginHorizontal: 5 }}>
                                <Image source={require('../assets/Plus.png')} style={{ width: 15, height: 15, left: 2, top: 5 }} />
                            </View>
                        </TouchableOpacity>
                    </ScrollView>

                    <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300, height: 200 }}>
                                <TextInput
                                style={{ fontSize: 16, backgroundColor: '#E3A387', borderRadius: 10, height: 40, padding: 5, marginBottom: 10 }}
                                placeholder="Type here"
                                onChangeText={(text) => setNewTagText(text)}
                                value={newTagText}
                                />
                                <Button title="Add Tag" onPress={() => {
                                addStylistTag();
                                setNewTagText('');
                                setModalVisible(false);
                                }} />
                                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                    </Modal>
                </View>

                <Text style={{fontSize: 20, fontWeight:'bold', top: 60, left: 30}}>Bio</Text>
                <View style={{ padding: 2, borderWidth: 1, borderColor: '#8C8989', borderRadius: 8, top: 70, marginHorizontal: 30 }}>
                    <TextInput
                        style={{fontSize: 16, backgroundColor: '#F9F3EE', height: 100,}}
                        multiline
                        placeholder="Add a short bio -- tell us about yourself"
                        value={Bio}
                        onChangeText={(text) => setBio(text)}
                    />
                </View>

                <View style={{ height: 450}}>
                    <Text style={{top: 80, left: 30, fontSize: 20, fontWeight: '600', }}>Business Hours</Text>
                    <Text style={{marginTop: 90, left: 30, fontSize: 20}}>Sunday</Text>
                    <Text style={{marginTop: 20, left: 30, fontSize: 20}}>Monday</Text>
                    <Text style={{marginTop: 20, left: 30, fontSize: 20}}>Tuesday</Text>
                    <Text style={{marginTop: 20, left: 30, fontSize: 20}}>Wednesday</Text>
                    <Text style={{marginTop: 20, left: 30, fontSize: 20}}>Thursday</Text>
                    <Text style={{marginTop: 20, left: 30, fontSize: 20}}>Friday</Text>
                    <Text style={{marginTop: 20, left: 30, fontSize: 20}}>Saturday</Text>
                    
                    <Dropdown
                        style={{top: -290, width: 90, left: 50, alignSelf: 'center', backgroundColor: '#F9F3EE', borderRadius: 8}}
                        placeholder=''
                        data={StartTime}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setSundayStart(item.value);
                        }}
                        itemTextStyle={{ fontSize: 14 }}
                        selectedTextStyle={{ fontSize: 16 }}
                    />
                    <Dropdown
                        style={{top: -325, width: 90, left: 150, alignSelf: 'center', backgroundColor: '#F9F3EE', borderRadius: 8}}
                        placeholder=''
                        data={EndTime}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setSundayEnd(item.value);
                        }}
                        itemTextStyle={{ fontSize: 14 }}
                        selectedTextStyle={{ fontSize: 16 }}
                    />
                    <Dropdown
                        style={{top: -315, width: 90, left: 50, alignSelf: 'center', backgroundColor: '#F9F3EE', borderRadius: 8}}
                        placeholder=''
                        data={StartTime}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setMondayStart(item.value);
                        }}
                        itemTextStyle={{ fontSize: 14 }}
                        selectedTextStyle={{ fontSize: 16 }}
                    />
                    <Dropdown
                        style={{top: -350, width: 90, left: 150, alignSelf: 'center', backgroundColor: '#F9F3EE', borderRadius: 8}}
                        placeholder=''
                        data={EndTime}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setMondayEnd(item.value);
                        }}
                        itemTextStyle={{ fontSize: 14 }}
                        selectedTextStyle={{ fontSize: 16 }}
                    />
                    <Dropdown
                        style={{top: -340, width: 90, left: 50, alignSelf: 'center', backgroundColor: '#F9F3EE', borderRadius: 8}}
                        placeholder=''
                        data={StartTime}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setTuesdayStart(item.value);
                        }}
                        itemTextStyle={{ fontSize: 14 }}
                        selectedTextStyle={{ fontSize: 16 }}
                    />
                    <Dropdown
                        style={{top: -375, width: 90, left: 150, alignSelf: 'center', backgroundColor: '#F9F3EE', borderRadius: 8}}
                        placeholder=''
                        data={EndTime}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setTuesdayEnd(item.value);
                        }}
                        itemTextStyle={{ fontSize: 14 }}
                        selectedTextStyle={{ fontSize: 16 }}
                    />
                    <Dropdown
                        style={{top: -365, width: 90, left: 50, alignSelf: 'center', backgroundColor: '#F9F3EE', borderRadius: 8}}
                        placeholder=''
                        data={StartTime}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setWednesdayStart(item.value);
                        }}
                        itemTextStyle={{ fontSize: 14 }}
                        selectedTextStyle={{ fontSize: 16 }}
                    />
                    <Dropdown
                        style={{top: -400, width: 90, left: 150, alignSelf: 'center', backgroundColor: '#F9F3EE', borderRadius: 8}}
                        placeholder=''
                        data={EndTime}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setWednesdayEnd(item.value);
                        }}
                        itemTextStyle={{ fontSize: 14 }}
                        selectedTextStyle={{ fontSize: 16 }}
                    />
                    <Dropdown
                        style={{top: -390, width: 90, left: 50, alignSelf: 'center', backgroundColor: '#F9F3EE', borderRadius: 8}}
                        placeholder=''
                        data={StartTime}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setThursdayStart(item.value);
                        }}
                        itemTextStyle={{ fontSize: 14 }}
                        selectedTextStyle={{ fontSize: 16 }}
                    />
                    <Dropdown
                        style={{top: -425, width: 90, left: 150, alignSelf: 'center', backgroundColor: '#F9F3EE', borderRadius: 8}}
                        placeholder=''
                        data={EndTime}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setThursdayEnd(item.value);
                        }}
                        itemTextStyle={{ fontSize: 14 }}
                        selectedTextStyle={{ fontSize: 16 }}
                    />
                    <Dropdown
                        style={{top: -415, width: 90, left: 50, alignSelf: 'center', backgroundColor: '#F9F3EE', borderRadius: 8}}
                        placeholder=''
                        data={StartTime}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setFridayStart(item.value);
                        }}
                        itemTextStyle={{ fontSize: 14 }}
                        selectedTextStyle={{ fontSize: 16 }}
                    />
                    <Dropdown
                        style={{top: -450, width: 90, left: 150, alignSelf: 'center', backgroundColor: '#F9F3EE', borderRadius: 8}}
                        placeholder=''
                        data={EndTime}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setFridayEnd(item.value);
                        }}
                        itemTextStyle={{ fontSize: 14 }}
                        selectedTextStyle={{ fontSize: 16 }}
                    />
                    <Dropdown
                        style={{top: -440, width: 90, left: 50, alignSelf: 'center', backgroundColor: '#F9F3EE', borderRadius: 8}}
                        placeholder=''
                        data={StartTime}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setSaturdayStart(item.value);
                        }}
                        itemTextStyle={{ fontSize: 14 }}
                        selectedTextStyle={{ fontSize: 16 }}
                    />
                    <Dropdown
                        style={{top: -475, width: 90, left: 150, alignSelf: 'center', backgroundColor: '#F9F3EE', borderRadius: 8}}
                        placeholder=''
                        data={EndTime}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setSaturdayEnd(item.value);
                        }}
                        itemTextStyle={{ fontSize: 14 }}
                        selectedTextStyle={{ fontSize: 16 }}
                    />
                </View>

                <View style={{ height: 100 }}>
                    <Text style={{color:'#713200', fontSize: 20, fontWeight: '400', left: 30, top: 0}}>Create Booking Polices</Text>
                </View>

                <Image
                    source={require('../assets/serviceReviews.png')}
                    style={{ height: 20, width: 161, left: 30 }}
                ></Image>

                <Text style={{ left: 30, top: 25, fontSize: 17, fontWeight: 'bold'}}>All Services</Text>

                
                {services.map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ backgroundColor: '#F9F3EE', borderRadius: 10, height: 40, width: 200, left: 30 }}>
                            <TextInput
                                style={{ fontSize: 15, top: 10, left: 10 }}
                                placeholder='Name of Service'
                                placeholderTextColor='#8C8989'
                                keyboardType='web-search'
                                keyboardAppearance='default'
                                maxLength={120}
                                onChangeText={text => updateService(index, 'name', text)}
                                value={item.name}
                                enterKeyHint='search'
                            />
                        </View>
                        <View style={{ backgroundColor: '#F9F3EE', borderRadius: 10, height: 40, width: 70, left: 100 }}>
                            <TextInput
                                style={{ fontSize: 15, top: 10, left: 10 }}
                                placeholder='Price'
                                placeholderTextColor='#8C8989'
                                keyboardType='numeric'
                                keyboardAppearance='default'
                                maxLength={6}
                                onChangeText={text => updateService(index, 'price', text)}
                                value={item.price}
                                enterKeyHint='search'
                            />
                        </View>
                        <TouchableOpacity onPress={() => deleteService(index)}>
                            <Image source={require('../assets/deleteIcon.png')} style={{ left: 110, top: 10, width: 20, height: 20, borderRadius: 20 }} />
                        </TouchableOpacity>
                    </View>
                ))}

                {/* Button to add new service */}
                <TouchableOpacity onPress={addServiceInput}>
                    <Image source={require('../assets/Plus.png')} style={{ left: 330, top: 10, width: 20, height: 20, marginBottom: 50 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={saveProfile}>
                    <View style={{ backgroundColor: '#C9A227', borderRadius: 10, alignItems: 'center', borderColor: '#472415', borderWidth: 1, left: 280, height: 24, width: 100 }}>
                        <Text style={{ top: 1, fontSize: 16, color: 'black', }}> Save Profile </Text>
                    </View>
                </TouchableOpacity>

                <View style={{ height: 50 }}></View>
            </ScrollView>
      </View>
    );
  }