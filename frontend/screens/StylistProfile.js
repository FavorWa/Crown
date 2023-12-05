import React, { useState, useEffect } from 'react';
import {StyleSheet, ScrollView, View, Pressable, useIs} from 'react-native';
import { Avatar, Text, ActivityIndicator, IconButton } from 'react-native-paper';
import {Tabs, TabScreen, TabsProvider, useTabIndex, useTabNavigation, } from 'react-native-paper-tabs';
import { useIsFocused } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import callApi from '../functions/callApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BACKEND_BASE_IOS, BACKEND_BASE_ANDROID } from '../secrets';

const backend_base_url = Platform.OS === 'android' ? BACKEND_BASE_ANDROID : BACKEND_BASE_IOS;

const StylistProfile = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const [stylist, setStylist] = useState(null);
    const [email, setEmail] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {_id} = route.params; 

    const getStylist = async () => {
        const business = await callApi(`/stylists/inhouse/${_id}`);
        setStylist(business);
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
        await getReviews();
        await getStylist();
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
                picture={stylist.picture}
                pricePoint={stylist.pricePoint}
                tags={stylist["tags"]}
                businessHours={stylist.businessHours}
                services={stylist.services}
                businessName={stylist.businessName}
                description={stylist.description}
                reviews={reviews}
                navigation={navigation}
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
                <Text style={{fontSize: 16}}>{content}</Text>
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
const Profile = ({_id, picture, pricePoint, tags, businessHours, services, businessName, description, reviews, navigation}) => {

    const handlePress = () => {
        navigation.navigate("ReviewFormScreen", {_id});
    }

    const INDEXES = [0, 1, 2, 3, 4, 5, 6];
    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return (
        <View style={styles.container}>

            <View style={styles.sectionContainer}>
                <View style={styles.titleLine}>
                    <Avatar.Image size={77} source={{uri: picture}} />
                    <Text variant="headlineLarge" style={styles.titleText}>{businessName}</Text>
                </View>
            </View>

            <View style={styles.bigSectionContainer}>
                <View style={styles.quickFacts}>
                    <Text variant="bodyMedium">{pricePoint}</Text>
                    <Text variant="bodyMedium">3.0 miles away</Text>
                    <View style={{alignItems: "center"}}>
                        <AirbnbRating defaultRating={5} showRating={false} isDisabled size={14} selectedColor="#713200"/>
                        <Text>94 reviews</Text>
                    </View>
                </View>
            </View>

            <View style={styles.bigSectionContainer}>
                <View>
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
                    <Text variant="bodyLarge">{description}</Text>
                </View>
            </View>

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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 28,
        marginTop: 40
    },

    bigSectionContainer: {
        marginBottom: 28
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
        fontSize: 16,
        color: 'black',
      },

    
    sectionTitle: {
        fontWeight: "bold",
        marginBottom: 7,
    },

    // hours row styles

    hoursRow: {
        flexDirection: "row"
    },

    dayText: {
        flex: 1,
        textAlign: 'left',
        fontSize: 14,
    },

    hoursText: {
        textAlign: 'right',
        fontSize: 14,
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
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: "bold"
    },

    serviceName: {
        flex: 1,
        textAlign: 'left',
        fontSize: 14,
    },

    servicePrice: {
        textAlign: 'right',
        fontSize: 14,
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
        fontSize: 16,
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
    }

})

export default StylistProfile;