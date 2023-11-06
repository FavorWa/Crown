import { useState, useEffect } from "react";
import { Card, Surface, Text, Divider, ActivityIndicator } from 'react-native-paper';
import { StyleSheet, Image, View, ScrollView, GestureResponderEvent, Platform} from 'react-native';
import openWebPage from "../functions/openWebPage";
import Homepage from "./HomePage";

const backend_base_url = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000';


interface ThumbnailInfo {
    image: string | null;
    title: string;
    link: string;
    snippet: string;
    minutes: number | null;
    styles?: object;
    isArticle?: boolean;
}

const Thumbnail = ({image, title, link, snippet, minutes, styles, isArticle} : ThumbnailInfo) => {

    const minutes_line = minutes == -1 ? "" : minutes + " minute read"
    return (
        isArticle ? (
            <Card style={styles} onPress={(e: GestureResponderEvent) => openWebPage(link)}>
                <Card.Title title={title} titleNumberOfLines={2} subtitle={minutes_line} left={() => <Image style={{width: 50, height: 50}}source={{uri: image}} />}/>
                    <Card.Content>
                        <Text variant="bodyMedium">{snippet}</Text>
                    </Card.Content>
            </Card>
        ) : 
        (
            <Card style={styles} onPress={(e: GestureResponderEvent) => openWebPage(link)}>
                    <Card.Cover source={{ uri: image }} style={{width: undefined}}/>
                    <Card.Title title={title} subtitle={minutes_line} titleNumberOfLines={2}/>
                    <Card.Content>
                        <Text variant="bodyMedium">{snippet}</Text>
                    </Card.Content>
            </Card>
        )
    )
}

const Blogs = () => {

    
    interface digest {
        general: ThumbnailInfo[];
        forYou: ThumbnailInfo[];
    }
    const [isLoading, setLoading] = useState(true);
    const [digest, setDigest] = useState<digest>({general: [], forYou: []});

    const getDigest = async () => {
        try {
            const generalUrl = `${backend_base_url}/digest/general`;
            const generalResponse = await fetch(generalUrl);
            const generalData = await generalResponse.json();

            const forYouUrl = `${backend_base_url}/digest/personal`;
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

    const createThumbnails = (thumbnailInfos : ThumbnailInfo[]) => {

        return thumbnailInfos.map((info) => {

            const image = info.image ? info.image : "https://cdn3.vectorstock.com/i/1000x1000/51/27/gold-crown-logo-icon-element-vector-21245127.jpg"
            const minutes = info.minutes ? Math.ceil(info.minutes) : -1
            return (
                <Thumbnail 
                image={image}
                title={info.title}
                link={info.link}
                snippet={info.snippet}
                minutes={minutes}
                styles={styles.smallCard} 
                isArticle={info.isArticle}
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

    /*
    return (

        <ScrollView style={styles.container}>
            <Text variant="headlineLarge" style={{textAlign: "center"}}>Today's Digest</Text>
            <Text variant="headlineSmall" style={{textAlign: "center"}}>General</Text>
            <Thumbnail 
                image="https://www.melissaerial.com/wp-content/uploads/2020/07/fall-hairstyles-for-black-women-1.jpg"
                title="Short Fall Hairstyles for Curly Hair"
                link="https://www.ouidad.com/blogs/curl-talk/short-hairstyles-for-fall"
                lede="Turn a new leaf with these looks"
                minutes="5" 
                styles={styles.smallCard} 
                isArticle/>
            <Thumbnail 
                image="https://hips.hearstapps.com/hmg-prod/images/gym-hairstyles-1543952708.jpg"
                title="Don't know how to wear your hair at the gym? We got you"
                link="https://www.thecurlstory.com/workout-hairstyles-for-curly-hair/"
                lede="Work out without worrying about your hair getting in the way"
                minutes="7"
                styles={styles.smallCard} 
                isArticle/>
            <Thumbnail
                image="https://i.pinimg.com/564x/77/49/4e/77494e645e79d8d974f16296b9c6dd61.jpg"
                title="Natural Hair: Starter's Guide"
                link="https://naturalhair.org/blogs/news/your-complete-guide-to-transitioning-to-natural-hair"
                lede="Want to transition to natural hair but don't know where to start? This article offers tips and tricks on how to take care of your hair and build a healthy daily routine"
                minutes="10"
                styles={styles.smallCard} 
                isArticle/>
            <Text variant="headlineSmall" style={{textAlign: "center"}}>Just for You</Text>

        </ScrollView>
    )
    */
    
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