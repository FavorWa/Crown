import { useState, useEffect } from "react";
import { Card, Surface, Text, Divider, ActivityIndicator, Searchbar } from 'react-native-paper';
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

const FilteredBlogsScreen = ({blogBoxes}) => {
    const newBoxes = blogBoxes.map((box) => {
        return (
            <View style={{marginBottom: 16}}>
                {box}
            </View>
        )
    })
    return (
        <ScrollView style={{marginTop: 32}}>
            <View style={styles.filteredBlogContainer}>
                {newBoxes}
            </View>
        </ScrollView>
    )
}

const Blogs = ({navigation}) => {
    const handleProfileNavigation = async () => {
        if (await AsyncStorage.getItem('LoginStatus') !== 'true') {
          navigation.replace('Login');
        } else {
          if (await AsyncStorage.getItem('userIdentity') === 'true') {
            navigation.replace('UserStylist');
          } else {
            navigation.replace('User');
          }
        }
      };

    const sections = ["Today's Digest", "Styling 101", "The Latest on Products", "Hair Health", "Making an Impact"]
    const [blogs, setBlogs] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filterOptions = ["New", "Styling", "Protective Styles", "Short Hair", "Medium Length Hair"]

    const handleFilterPress = (filter) => {
        if (selectedFilters.includes(filter)) {
          setSelectedFilters(selectedFilters.filter((f) => f !== filter));
        } 
        else {
          setSelectedFilters([...selectedFilters, filter]);
        }
    };

    const filterBlogs = () => {
        let filteredList = [...blogs]
        if (searchQuery != "") {
          filteredList = filteredList.filter((blog) => blog.title.includes(searchQuery))
        }
  
        if (selectedFilters.length > 0) {
          for (const filter of selectedFilters) {
            filteredList = filteredList.filter((blog) => blog.tags.includes(filter))
        }
      }

      return filteredList
    }
    const getBlogBoxes = (blogs, NUM_BOXES) => {
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

    const blogsToBoxes = (blogs) => {
        const blogBoxes = blogs.map((blog) => {
            return (
                <Box 
                image = {blog.image}
                title = {blog.title}
                link = {blog.link}
                time = {blog.time}
                isArticle = {blog.isArticle}
                _id = {blog._id}
                navigation = {navigation}
                />
            )})
        return blogBoxes
    }

    const FilteredBlogs = () => {
        if (searchQuery != "" || selectedFilters.length > 0) {
            const filteredList = filterBlogs()
            const blogBoxes = blogsToBoxes(filteredList)
            return <FilteredBlogsScreen blogBoxes={blogBoxes}/>
        }
    }

    const AllBlogs = () => {
        return sections.map((section, index) => {

            const filteredBlogs = blogs.filter((blog) => {
                return blog["tags"].includes(section);
            })

            const filteredBlogComponents = getBlogBoxes(filteredBlogs, 6);
            return (
                <View key={index} style={styles.section}>
                    <Text variant="headlineMedium" style={styles.sectionHeading}>{section}</Text>
                    <Row blogBoxes={filteredBlogComponents} /> 
                </View>
            )
        })
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
        <SafeAreaView style={{paddingHorizontal: 20}}>
            <ScrollView style={{marginBottom: 50}}>
            <Text variant="headlineLarge" style={styles.heading}>Blogs</Text>
            <Text variant="headlineSmall" style={styles.subheading}>All the information you need in one place.</Text>
            <View style={{marginTop: 32}}>
            <Searchbar 
              placeholder="Search stylists"
              onChangeText={text => setSearchQuery(text)}
              value={searchQuery}
              style={{backgroundColor: '#D9D9D9'}}
            />
          </View>

          <View style={styles.filterContainer}>
            <ScrollView horizontal={true}>
              {
                filterOptions.map((filter) => {
                  return (
                    <TouchableOpacity
                    key={filter}
                    onPress={() => handleFilterPress(filter)}
                  >
                    <View style={[[
                      styles.textContainer,
                      selectedFilters.includes(filter) && styles.selectedFilter,
                    ]]}>
                      <Text style={styles.filterText}>{filter}</Text>
  
                    </View>
                  </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
            {
                blogs.length === 0 ? <ActivityIndicator /> : (searchQuery != "" || selectedFilters.length > 0 ? <FilteredBlogs /> : AllBlogs())
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

                <TouchableOpacity onPress={() => handleProfileNavigation()}>
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
    },

    subheading: {
        color: "#713200",
        fontSize: 14,
    },

    sectionHeading: {
        marginTop: 14,
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
        marginLeft: 75,
        marginTop: 15,
      },
      Compassword: {
        marginLeft: 70,
      },
      Barbershop: {
        aspectRatio: 1.2,
        alignSelf: 'center',
        marginTop: -55,
      },
      Barbershopword: {
        alignSelf: 'center',
        marginBottom: -40,
      },
      User: {
        marginLeft: 305,
        marginTop: -55,
        aspectRatio: 1.2,
      },
      Userword: {
        marginLeft: 308,
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
        marginLeft: 300,
        marginVertical: -55,
      },

      filterContainer: {
        marginTop: 32,
      },
      textContainer: {
        backgroundColor: '#E3A387', // Change this to your desired background color
        borderRadius: 10, // Border radius of the container
        alignContent: 'center',
        marginHorizontal: 5,
        paddingHorizontal: 16
      },

      filterText: {
        color: 'black',
        fontSize: 20
      },
  
      selectedFilter: {
        borderColor: 'black',
        borderWidth: 2,
      },

      filteredBlogContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
      }
})