import React, { useState, useEffect } from 'react';
import {StyleSheet, ScrollView, View, Image} from 'react-native';
import { Avatar, Text, ActivityIndicator, List } from 'react-native-paper';
import callApi from '../functions/callApi';

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
// picture is a url to the profile picture
// pricepoint is $, $$, $$$
const Profile = ({picture, pricePoint, tags, businessHours, services, businessName, description}) => {
    if (tags) {
        console.log(tags);
    }

    if (businessHours === undefined) {
        print('business hours are undefined')
    }

    if (services === undefined) {
        print('services are undefined')
    }
    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleLine}>
                <Avatar.Image size={24} source={{uri: picture}} />
                <Text variant="headlineLarge">{businessName}</Text>
            </View>
            <View style={styles.quickFacts}>
                <Text variant="bodyMedium">{pricePoint}</Text>
            </View>
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
            <View>
                <Text variant="bodyLarge">{description}</Text>
            </View>
            <View>
                <Text>Business Hours</Text>
                <View style={styles.schedule}>
                    <View style={styles.innerContainer}>
                        {
                        
                        DAYS.map((day) => {
                            return (
                                <Text>{day}</Text>
                            )
                        })
                        }
                    </View>
                    <View style={styles.innerContainer}>
                        {
                        businessHours.map((hour) => {
                            return (
                                <Text>{hour}</Text>
                            )
                        })
                    }
                    </View>
                </View>
            </View>
            <View>
                <Text>Services</Text>
                <View>
                    {
                    services.map((service) => {
                        return (
                            <View style={styles.columnsContainer}>
                                <View>
                                    <Text>{service[0]}</Text>
                                    {service[1] ? <Text>{service[1]}</Text> : null}
                                </View>
                                <View>
                                    <Text>{service[2]}</Text>
                                </View>
                            </View>
                        )
                    })
                }
                </View>
            </View>
 
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    titleLine: {
        flexDirection: "row",
    },

    quickFacts: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },

    tagContainer: {
        backgroundColor: '#E3A387',
        borderRadius: 10,
        alignContent: 'center',
        marginHorizontal: 5,
    },

    tagText: {
        top: 2,
        fontSize: 16,
        color: 'black',
      },

    schedule: {
        flexDirection: "row",
        justifyContent: "center"
    },

    innerContainer: {
        marginHorizontal: 10
    },

    columnsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
})

export default StylistProfile;