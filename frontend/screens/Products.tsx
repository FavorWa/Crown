import { View, Image } from "react-native"
import { Style } from "react-native-paper/lib/typescript/components/List/utils"
import { Text, TouchableRipple, List } from "react-native-paper"
import openWebPage from "../functions/openWebPage"

interface Product {
    title: string,
    link: string,
    image: string,
    price: string,
    description: string
}


const Product = ({title, link, image, price, description}: Product) => {

    const handleProductPress = () => {
        openWebPage(link);
    }

    return (
        <List.Item
            TouchableRipple={handleProductPress}
            title={title}
            description={description}
            left={(props: { color: string; style: Style }) => (
                <Image
                    source={{
                        uri: image,
                        method: 'GET',
                    }}
                    style={{width: 400, height: 400}}
            />)}
            right={(props: { color: string; style: Style }) => <Text>{price}</Text>}
        >
        </List.Item>
    )
}

const Products = (hairType: string) => {

    return (
        <List.Section>
            <List.Subheader>Products for hair type {hairType}</List.Subheader>
        </List.Section>
    )
}

export default Products