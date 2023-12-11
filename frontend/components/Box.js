import { View, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

const Box = ({image, title, link, time, isArticle, _id, navigation}) => {

    const handlePress = () => {
        navigation.navigate('Article', {_id, link});
    }

    const activity = isArticle ? "read" : "watch";
    const minutesLine = `${time} minute ${activity}`;

    const source = image ? {uri: image} : "../assets/Rectangle4.png";

    return (
        <TouchableOpacity onPress={handlePress}>
            <ImageBackground source={source} style={styles.box}>
                <View style={styles.title}>
                    <Text style={{color: "white", fontWeight: "bold"}} numberOfLines={1}>{title}</Text>
                    <Text style={{color: "white", fontWeight: "bold"}}>{minutesLine}</Text>
                </View>
                {!isArticle ? (
                    <Text style={styles.videoLabel}>Video</Text>
                ): null
                }
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 190,
        width: 120,
        borderRadius: 15,
        marginRight: 20,
        resizeMode: "cover",
        overflow: "hidden"
    }, 
    title: {
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    videoLabel: {
        position: 'absolute',
        right: 0,
        top: 0
    }
});

export default Box;