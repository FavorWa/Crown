import { Linking } from "react-native";

const openWebPage = (url: string) => {
    Linking.openURL(url)
      .catch((err) => console.error('An error occurred: ', err));
};

export default openWebPage;