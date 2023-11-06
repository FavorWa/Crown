import { useState, useEffect } from "react";
import { Card, Surface, Text, Divider, ActivityIndicator } from 'react-native-paper';
import { StyleSheet, Image, View, ScrollView, GestureResponderEvent, Platform} from 'react-native';
import { BACKEND_BASE_IOS, BACKEND_BASE_ANDROID } from '../secrets';
import openWebPage from "../functions/openWebPage";
import Homepage from "./HomePage";


const backend_base_url = Platform.OS === 'android' ? BACKEND_BASE_ANDROID : BACKEND_BASE_IOS;

const Thumbnail = ({image, title, link, snippet, minutes, styles, isArticle, _id, navigation}) => {

    const minutes_line = minutes == -1 ? "" : minutes + " minute read"
    return (
        isArticle ? (
            <Card style={styles} onPress={() => navigation.navigate('Article', {_id, link})}>
                <Card.Title title={title} titleNumberOfLines={2} subtitle={minutes_line} left={() => <Image style={{width: 50, height: 50}}source={{uri: image}} />}/>
                    <Card.Content>
                        <Text variant="bodyMedium">{snippet}</Text>
                    </Card.Content>
            </Card>
        ) : 
        (
            <Card style={styles} onPress={() => navigation.navigate('Article', {_id, link})}>
                    <Card.Cover source={{ uri: image }} style={{width: undefined}}/>
                    <Card.Title title={title} subtitle={minutes_line} titleNumberOfLines={2}/>
                    <Card.Content>
                        <Text variant="bodyMedium">{snippet}</Text>
                    </Card.Content>
            </Card>
        )
    )
}

const Blogs = ({navigation}) => {

    
    const [isLoading, setLoading] = useState(true);
    const [digest, setDigest] = useState({general: [], forYou: []});

    const getDigest = async () => {
        try {
            const generalUrl = `${backend_base_url}/digest/general`;
            console.log(generalUrl);
            const generalResponse = await fetch(generalUrl);
            const generalData = await generalResponse.json();

            const forYouUrl = `${backend_base_url}/digest/personal`;
            console.log(forYouUrl);
            const forYouResponse = await fetch(forYouUrl);
            const forYouData = await forYouResponse.json()

            setDigest({
                general: generalData,
                forYou: forYouData
            })

            setLoading(false);
        } 
            
        catch (error) {
            console.error(error);
        }
    
    };

    const createThumbnails = (thumbnailInfos) => {

        return thumbnailInfos.map((info) => {

            const image = info.image ? info.image : "https://cdn3.vectorstock.com/i/1000x1000/51/27/gold-crown-logo-icon-element-vector-21245127.jpg"
            const minutes = info.minutes ? Math.ceil(info.minutes) : -1
            return (
                <Thumbnail 
                key={info._id}
                _id={info._id}
                image={image}
                title={info.title}
                link={info.link}
                snippet={info.snippet}
                minutes={minutes}
                styles={styles.smallCard} 
                isArticle={info.isArticle}
                navigation={navigation}
            />
            )
        });
    }

    useEffect(() => {
        getDigest();
    }, []);

    const makeThumbnails = (thumbnailInfos : ThumbnailInfo[]) => {
        return thumbnailInfos.map((info) => {
            const image = info.image ? info.image : "https://cdn3.vectorstock.com/i/1000x1000/51/27/gold-crown-logo-icon-element-vector-21245127.jpg";
            return {
                image, // Add image URL to the object
                title: info.title,
                link: info.link,
                snippet: info.snippet,
                minutes: info.minutes ? Math.ceil(info.minutes) : -1,
                isArticle: info.isArticle
            };
        });
    };
    

    return (
        isLoading ? <ActivityIndicator /> : (
            <ScrollView style={styles.container}>
                <Text variant="headlineLarge" style={{textAlign: "center"}}>Today's Digest</Text>
                <Text variant="headlineSmall" style={{textAlign: "center"}}>General</Text>
                {createThumbnails(digest["general"])}
                <Text variant="headlineSmall" style={{textAlign: "center"}}>Just for You</Text>
                {createThumbnails(digest["forYou"])}

            </ScrollView>
        )

    )
    
}

export default Blogs;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },

    smallCard: {
        marginBottom: 16
    }
})