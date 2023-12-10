import React, { useState, useEffect } from 'react';
import {StyleSheet, ScrollView, View, Image} from 'react-native';
import { Avatar, Text, ActivityIndicator, List } from 'react-native-paper';
import {Tabs, TabScreen, TabsProvider, useTabIndex, useTabNavigation, } from 'react-native-paper-tabs';
import { Rating, AirbnbRating } from 'react-native-ratings';
import callApi from '../functions/callApi';
import BottomBar from '../components/BottomBar';

import { BACKEND_BASE_IOS, BACKEND_BASE_ANDROID } from '../secrets';

const backend_base_url = Platform.OS === 'android' ? BACKEND_BASE_ANDROID : BACKEND_BASE_IOS;

const StylistProfile = ({ navigation, route }) => {
    const [stylist, setStylist] = useState(null);
    const {_id} = route.params; 

    const getStylist = async () => {
        business = await callApi(`/stylists/inhouse/${_id}`);
        setStylist(business);
    }

    useEffect(() => {
        getStylist()
    }, [])

    if (stylist) {
        return (
            <Profile
                picture={stylist.picture}
                pricePoint={stylist.pricePoint}
                tags={stylist["tags"]}
                businessHours={stylist.businessHours}
                services={stylist.services}
                businessName={stylist.businessName}
                description={stylist.description}
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
// picture is a url to the profile picture
// pricepoint is $, $$, $$$
const Profile = ({picture, pricePoint, tags, businessHours, services, businessName, description}) => {

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
                    <ScrollView horizontal={true} >
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
                            <View style={{flex: 1}}>
                                <Text>Reviews</Text>
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
        backgroundColor: '#E3A387',
        borderRadius: 10,
        alignContent: 'center',
        marginHorizontal: 5,
        paddingHorizontal: 7,
        paddingVertical: 4
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
    }
})

export default StylistProfile;