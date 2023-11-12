import { useState, useEffect } from "react";
import { Card, Surface, Text, Divider, ActivityIndicator,  } from 'react-native-paper';
import { StyleSheet, Image, View, ScrollView, GestureResponderEvent, Platform} from 'react-native';
import { BACKEND_BASE_IOS, BACKEND_BASE_ANDROID } from '../secrets';
import openWebPage from "../functions/openWebPage";
import Homepage from "./HomePage";
import Box from "../components/Box";
import callApi from "../functions/callApi";


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
    console.log(blogs);

    const getBlogBoxes = (blogs) => {
        const NUM_BOXES = 6;
        const blogsBoxes = [];
        for (let index = 0; index < NUM_BOXES; index++) {
          try {
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
    
          catch {
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

    return (
        <ScrollView>
            <Text variant="headlineLarge" style={styles.heading}>Blogs</Text>
            <Text variant="headlineSmall" style={styles.subheading}>All the information you need in one place.</Text>
            {
                blogs.length == 0 ? <ActivityIndicator /> : (
                    sections.map((section) => {

                        const filteredBlogs = blogs.filter((blog) => {
                            return blog.tags.includes(section);
                        })
        
                        const filteredBlogComponents = getBlogBoxes(filteredBlogs);
                        return (
                            <View style={styles.section}>
                                <Text variant="headlineMedium" style={styles.sectionHeading}>{section}</Text>
                                <Row blogBoxes={filteredBlogComponents} />
                            </View>
                        )
                    })
                )
            }
        </ScrollView>
    );


}

export default Blogs;

const styles = StyleSheet.create({
    heading: {
        marginTop: 7,
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
})