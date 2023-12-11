import React, { useState, useEffect } from 'react';
import {StyleSheet, ScrollView, View, Pressable, TouchableOpacity} from 'react-native';
import { Avatar, Text, ActivityIndicator, IconButton } from 'react-native-paper';
import {Tabs, TabScreen, TabsProvider, useTabIndex, useTabNavigation, } from 'react-native-paper-tabs';
import { useIsFocused } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import callApi from '../functions/callApi';
import BottomBar from '../components/BottomBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BACKEND_BASE_IOS, BACKEND_BASE_ANDROID } from '../secrets';

const backend_base_url = Platform.OS === 'android' ? BACKEND_BASE_ANDROID : BACKEND_BASE_IOS;

const StylistProfile = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const [stylist, setStylist] = useState(null);
    const [email, setEmail] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
    const {_id} = route.params; 

    const getStylist = async () => {
        const business = await callApi(`/stylists/inhouse/${_id}`);
        const totalRating = reviews.reduce((sum, review) => sum + review.starsNum, 0);
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
        const numReviews = reviews.length
        setStylist({...business, averageRating, numReviews});
    }

    const getReviews = async () => {
        const reviews = await callApi(`/stylists/inhouse/${_id}/reviews`);
        for (const review of reviews) {
            const dateObj = new Date(review.time);
            const formattedDate = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }).format(dateObj);
            review.time = formattedDate;
        }
        setReviews(reviews);
    }


    const postReview = async (review) => {
        const reqObj = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
          }

        const res = await callApi(`/stylists/inhouse/${_id}/reviews`, reqObj);
    }

    const initPage = async () => {
        const email = await AsyncStorage.getItem("userEmail");
        setEmail(email);
        await getStylist();
        await getReviews();
        await fetchUserAvatar();
        setIsLoading(false);
    }

    useEffect(() => {
        isFocused && initPage()
    }, [isFocused])

    if (!isLoading) {
        console.log(`Reviews: ${reviews}`)
        return (
            <Profile
                _id={_id}
                picture={stylist.avatar}
                pricePoint={stylist.pricePoint}
                tags={stylist["tags"]}
                businessHours={stylist.businessHours}
                services={stylist.services}
                businessName={stylist.businessName}
                description={stylist.description}
                reviews={reviews}
                stylist={stylist}
                navigation={navigation}
                userName={userName}
                userAvatar={userAvatar}
                userEmail={userEmail}
            />
        )
    }

    else {
        return <ActivityIndicator />
    }
}

const HoursRow = ({day, hours}) => {
    return (
        <View style={styles.hoursRow}>
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.hoursText}>{hours}</Text>
        </View>
    )
}

const ServicesRow = ({name, descriptor, price}) => {
    return (
        <View style={styles.serviceRowContainer}>
            <View style={styles.firstLine}>
                <Text style={styles.serviceName}>{name}</Text>
                <Text style={styles.servicePrice}>${price}</Text>
            </View>
            {descriptor ? <Text style={styles.secondLine}>{descriptor}</Text> : null}
        </View>
    )
}

const Review = ({title, starsNum, reviewer, time, content, businessName, tags}) => {
    return (
        <View style={styles.reviewContainer}>
            <View style={styles.reviewSectionContainer}>
                <View style={styles.titleLine}>
                    <View>
                        <Text style={{fontWeight: "bold", fontSize: 20}}>{title}</Text>
                    </View>
                    <View>
                        <AirbnbRating defaultRating={starsNum} showRating={false} isDisabled size={14} selectedColor="#713200"/>
                    </View>
                </View>
                <View>
                    <Text style={{fontWeight: "200"}}>{reviewer} | {time}</Text>
                </View>
            </View>
            <View style={styles.reviewSectionContainer}>
                <Text style={{fontSize: 20}}>{content}</Text>
            </View>
            <View style={styles.reviewSectionContainer}>
                <Text style={{fontWeight: "bold", marginBottom: 16}}>{businessName} is...</Text>
                <View style={{flex: 1}}>
                    <ScrollView horizontal={true} style={{flex: 1}}>
                        {
                            tags.map((tag) => {
                                return (
                                    <View style={styles.tagContainer}>
                                        <Text style={styles.tagText}>{tag}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}
// picture is a url to the profile picture
// pricepoint is $, $$, $$$
const Profile = ({_id, picture, pricePoint, tags, businessHours, services, businessName, description, reviews, navigation, stylist, userName, userAvatar, userEmail}) => {
    const handlePress = () => {
        navigation.navigate("ReviewFormScreen", {_id});
    }

    const handleSendMessagePress = () => {
        if (userEmail) {
            navigation.navigate('ChatBox', { stylistEmail: stylist.email, stylistName: businessName, stylistAvatar: picture, userName: userName, userAvatar: userAvatar, userEmail: userEmail })
        }
        else {
            navigation.navigate("Login")
        }
    }

    const handleBookAptPress = () => {
        if (userEmail) {
            navigation.navigate("BookAppointment", { business: stylist})
        }
        else {
            navigation.navigate("Login")
        }
    }

    const INDEXES = [0, 1, 2, 3, 4, 5, 6];
    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return (
        <View style={{backgroundColor: "white", flex: 1}}>
            <View style={styles.container}>
                
                <View style={styles.sectionContainer}>
                    <View style={styles.titleLine}>
                        <Avatar.Image size={77} source={{uri: picture}} />
                        <Text variant="headlineLarge" style={styles.titleText}>{businessName}</Text>
                    </View>
                </View>

                <View style={styles.bigSectionContainer}>
                    <View style={styles.quickFacts}>
                        <Text style={{fontSize: 20}}>{pricePoint}</Text>
                        <Text style={{fontSize: 20}} variant="bodyMedium">3.0 miles away</Text>
                        <View style={{alignItems: "center"}}>
                            <AirbnbRating defaultRating={stylist.averageRating} showRating={false} isDisabled size={16} selectedColor="#713200"/>
                            <Text style={{fontSize: 16}}>{stylist.numReviews} reviews</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.bigSectionContainer}>
                    <View style={{height: 32}}>
                        <ScrollView horizontal={true} style={{flex: 1}}>
                            {

                            tags.map((tag) => {
                                return (
                                    <View style={styles.tagContainer}>
                                        <Text style={styles.tagText}>{tag}</Text>
                                    </View>
                                )
                            })
                        }
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.bigSectionContainer}>
                    <View>
                        <Text variant="bodyLarge" style={{fontSize: 20}}>{description}</Text>
                    </View>
                </View>

                <View style={{height: 300}}>
                    <TabsProvider defaultIndex={0}>
                        <View style={{flex: 1}}>
                            <Tabs theme={{colors: {primary: "#713200"}}}>
                                <TabScreen label="Services">
                                    <View style={{flex: 1}}>
                                        <ScrollView>
                                        <View style={styles.sectionContainer}>
                                                <Text style={styles.sectionTitle}>Business Hours</Text>
                                                <View>
                                                    {
                                                        INDEXES.map((index) => {
                                                            return <HoursRow day={DAYS[index]} hours={businessHours[index]} />
                                                        })
                                                    }
                                                </View>
                                            </View>
                                            <View style={styles.sectionContainer}>
                                                <Text style={styles.sectionTitle}>All Services</Text>
                                                <View style={styles.servicesContainer}>
                                                    {
                                                        services.map((service) => {
                                                            return (
                                                                <ServicesRow name={service[0]} descriptor={service[1]} price={service[2]} />
                                                            )
                                                        })
                                                    }
                                                </View>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </TabScreen>
                                <TabScreen label="Reviews">
                                    <View style={styles.reviewsContainer}>
                                        <View style={styles.addReviewButtonContainer}>
                                            <Pressable style={styles.addReviewButton} onPress={handlePress}>
                                                <Text style={styles.addReviewText}>+ Add a review!</Text>
                                            </Pressable>

                                        </View>
                                        <View>
                                            <ScrollView>
                                                <View>
                                                    {reviews.map((review) => {
                                                        return (
                                                            <Review
                                                                title={review.title}
                                                                starsNum={review.starsNum}
                                                                reviewer={review.reviewer}
                                                                time={review.time}
                                                                content={review.content}
                                                                businessName={review.businessName}
                                                                tags={review.tags}
                                                            />
                                                        )
                                                    })}
                                                </View>
                                            </ScrollView>
                                        </View>
                                    </View>
                                </TabScreen>
                            </Tabs>
                        </View>
                    </TabsProvider>
                </View>

                <View style={styles.buttonsContainer}>
                    <View>
                        <TouchableOpacity style={{alignItems: "center"}} onPress={handleSendMessagePress}>
                            <View style={styles.sendAMessageButton}>
                                <Text style={styles.sendAMessageText}>Send a message</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={{alignItems: "center"}} onPress={handleBookAptPress}>
                            <View style={styles.bookAppointmentButton}>
                                <Text style={styles.bookAppointmentText}>Book Appointment</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 28,
        marginTop: 40
    },

    bigSectionContainer: {
        marginBottom: 20
    },

    titleText: {
        alignSelf: "flex-end",
        marginLeft: 14,
        marginBottom: 7
    },

    titleLine: {
        flexDirection: "row",
        justifyContent: "center"
    },

    quickFacts: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-end"
    },

    tagContainer: {
        flex: 1,
        backgroundColor: '#E3A387',
        borderRadius: 10,
        alignContent: 'center',
        paddingHorizontal: 7,
        paddingVertical: 4,
        marginRight: 8,
    },

    tagText: {
        top: 2,
        fontSize: 20,
        color: 'black',
      },

    
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 7,
    },

    // hours row styles

    hoursRow: {
        flexDirection: "row"
    },

    dayText: {
        fontSize: 20,
        flex: 1,
        textAlign: 'left',
    },

    hoursText: {
        textAlign: 'right',
        fontSize: 20,
    },

    //service row styles

    servicesContainer: {
    },

    serviceRowContainer: {
        marginBottom: 7
    },

    firstLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    secondLine: {
        textAlign: 'left',
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: "bold"
    },

    serviceName: {
        flex: 1,
        textAlign: 'left',
        fontSize: 20,
    },

    servicePrice: {
        textAlign: 'right',
        fontSize: 20,
    },

    sectionContainer: {
        marginVertical: 7,
    },

    reviewsContainer: {
        flex: 1
    },

    addReviewButtonContainer: {
        alignItems: "flex-end"
    },

    addReviewButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderRadius: 16,
        borderColor: "#472415",
        borderWidth: 2,
        marginTop: 16,
        marginBottom: 16
      },

      addReviewText: {
        fontSize: 20,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#472415',
      },

    titleLine: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    reviewSectionContainer: {
        flex: 1,
        marginBottom: 8
    },

    reviewContainer: {
        marginBottom: 8
    },

    sendAMessageButton: {
        borderColor: "#472415",
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 7,
        paddingVertical: 4,
        maxWidth: 160
    },

    sendAMessageText: {
        fontSize: 20,
        textAlign: "center",
        color: "#472415"
    },

    bookAppointmentButton: {
        backgroundColor: "#E3A387",
        borderRadius: 10,
        paddingHorizontal: 7,
        paddingVertical: 4,
        maxWidth: 160
    },

    bookAppointmentText: {
        fontSize: 20,
        textAlign: "center"
    },

    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 12
    }

})

export default StylistProfile;