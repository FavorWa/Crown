import { useState, useEffect } from "react";
import { Card, Surface, Text, Divider, ActivityIndicator,  } from 'react-native-paper';
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, Platform} from 'react-native';
import { BACKEND_BASE_IOS, BACKEND_BASE_ANDROID } from '../secrets';
import openWebPage from "../functions/openWebPage";
import Homepage from "./HomePage";
import Box from "../components/Box";
import callApi from "../functions/callApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectableImages } from './User';
import { SafeAreaView } from "react-native-safe-area-context";


const backend_base_url = Platform.OS === 'android' ? BACKEND_BASE_ANDROID : BACKEND_BASE_IOS;

const Row = ({blogBoxes}) => {
    return (
        <View style={styles.scrollContainer}>
            <ScrollView horizontal={true} >
                {blogBoxes}
            </ScrollView>
        </View>
    )
}


const Blogs = ({navigation}) => {
    const sections = ["Today's Digest", "Styling 101", "The Latest on Products", "Hair Health", "Making an Impact"]
    const [blogs, setBlogs] = useState([]);

    const getBlogBoxes = (blogs) => {
        const NUM_BOXES = 6;
        const blogsBoxes = [];

        for (let index = 0; index < NUM_BOXES; index++) {
            if (index < blogs.length) {
                const blogObj = blogs[index];
                if (blogObj) {
                    const blogBox = 
                    <Box 
                    image = {blogObj.image}
                    title = {blogObj.title}
                    link = {blogObj.link}
                    time = {blogObj.time}
                    isArticle = {blogObj.isArticle}
                    _id = {blogObj._id}
                    navigation = {navigation}
                    />
                    blogsBoxes.push(blogBox)
                }
            }

            else {
                blogsBoxes.push(
                    <Image
                    source={require('../assets/Rectangle4.png')}
                    style={styles.scrollObject}
                    />
                )
            }
            }
        
        return blogsBoxes;
    }

    const getBlogs = async () => {
        let url = "/blogs/sections?"

        for (const section of sections) {
            url += `&sections=${section}`;
        }


        const blogsData = await callApi(url);
        setBlogs(blogsData);
    }

    useEffect(() => {
        getBlogs();
    }, []);

    const [userAvatar, setUserAvatar] = useState(null);
    const fetchUserAvatar = async () => {
        const avatar = await AsyncStorage.getItem('userAvatar');
        setUserAvatar(avatar);
    };

    useEffect(() => {
        fetchUserAvatar();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView style={{marginBottom: 50}}>
            <Text variant="headlineLarge" style={styles.heading}>Blogs</Text>
            <Text variant="headlineSmall" style={styles.subheading}>All the information you need in one place.</Text>
            {
                blogs.length === 0 ? <ActivityIndicator /> : (
                    sections.map((section, index) => {

                        const filteredBlogs = blogs.filter((blog) => {
                            return blog["tags"].includes(section);
                        })
        
                        const filteredBlogComponents = getBlogBoxes(filteredBlogs);
                        return (
                            <View key={index} style={styles.section}>
                                <Text variant="headlineMedium" style={styles.sectionHeading}>{section}</Text>
                                <Row blogBoxes={filteredBlogComponents} /> 
                            </View>
                        )
                    })
                )
            }

                
            </ScrollView>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', bottom: 60 }}>
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

export default Blogs;

const styles = StyleSheet.create({
    heading: {
        marginHorizontal: 28,
    },

    subheading: {
        color: "#713200",
        marginHorizontal: 28,
        fontSize: 14,
    },

    sectionHeading: {
        marginTop: 14,
        marginHorizontal: 28,
    },

    container: {
        padding: 16,
    },

    smallCard: {
        marginBottom: 16
    },

    scrollContainer: {
        top: 15,
        height: 160,
        marginHorizontal: 28,
    },

    scrollObject: {
        height: 160,
        width: 120,
        borderRadius: 15,
        marginRight: 10,
      },

    section: {
        marginBottom: 20
    },

    rectangle4: {
        backgroundColor: 'rgba(217, 217, 217, 1)',
        width: 355,
        height: 150,
        borderRadius: 20,
        position: 'absolute',
        left: 28,
        top: 40,
    },
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
})