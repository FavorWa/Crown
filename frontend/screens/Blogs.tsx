import * as React from 'react';
import { Surface, Text, Divider } from 'react-native-paper';
import { StyleSheet, Image} from 'react-native';

interface ThumbnailInfo {
    image: string;
    title: string;
    lede: string;
    minutes: string;
    styles: object;
}
const Thumbnail = ({image, title, lede, minutes, styles} : ThumbnailInfo) => {
    <Surface style={styles}>
        <Image source={{uri: image, method: 'GET'}} />
        <Divider />
        <Text variant="headlineSmall">{title}</Text>
        <Text variant="bodyLarge">{lede}</Text>
        <Text variant="bodySmall">{minutes + " minute read"}</Text>
    </Surface>
}

const miniDigest = () => {

}

const styles = StyleSheet.create({
    leftSmallThumbnail: {

    }
})