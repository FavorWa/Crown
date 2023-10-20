import { View, Image } from "react-native"
import { Style } from "react-native-paper/lib/typescript/components/List/utils"
import { Text, TouchableRipple, List } from "react-native-paper"
import openWebPage from "../functions/openWebPage"

interface Product {
    title: string,
    link: string,
    image: string,
    price: string,
}


const Product = ({title, link, image, price}: Product) => {

    const handleProductPress = () => {
        openWebPage(link);
    }

    return (
        <List.Item
            onPress={handleProductPress}
            title={title}
            description=""
            left={() => (
                <Image
                    source={{
                        uri: image,
                        method: 'GET',
                    }}
                    style={{width: 64, height: 64}}
            />)}
            right={() => <Text>{price}</Text>}
        />
    )
}

// a couple 2a hair products
const dummyProducts = [
    {
        title: "LUS Brands Love Ur Curls for Wavy Hair, 3-Step System - Shampoo and Conditioner Set with All-in-One Styler - LUS Curls Hair Products for Volume - Nonsticky, Nongreasy, Light Formula - 8.5oz each",
        link: "https://www.amazon.com/Brands-Love-Ur-Curls-3-Step/dp/B09YMZC7S4/ref=sr_1_1?keywords=hair+type+2a+products&qid=1697754897&sr=8-1",
        image: "https://m.media-amazon.com/images/I/71lzaC-MvFL._AC_UL320_.jpg",
        price: "$55.00"
    },
    {
        title: "DevaCurl Wave Maker Lightweight Moisturizing Definer | Hydrates and Smooths Curls | Tames Frizz Up To 48 hours",
        link: "https://www.amazon.com/DevaCurl-Maker-Lightweight-Moisturizing-Definer/dp/B09CQLZ2MY/ref=sr_1_2?keywords=hair+type+2a+products&qid=1697754897&sr=8-2",
        image: "https://m.media-amazon.com/images/I/51Q-zu6wdkL._AC_UL320_.jpg",
        price: "$18.00"
    },
    {
        title: "SheaMoisture Curl Mousse Coconut and Hibiscus for Frizz Control Styling Mousse with Shea Butter 7.5 oz",
        link: "https://www.amazon.com/SheaMoisture-Coconut-Hibiscus-Frizz-Free-Mousse/dp/B07NQCBRK3/ref=sr_1_3?keywords=hair+type+2a+products&qid=1697754897&sr=8-3",
        image: "https://m.media-amazon.com/images/I/71FUUduzcgL._AC_UL320_.jpg",
        price: "$8.03"
    }
]
const Products = () => {

    const hairType = "2a"
    const productsToComponents = (products: Product[]) => {
        return products.map((product: Product) => {
            return (
                <Product 
                title={product.title}
                link={product.link}
                image={product.image}
                price={product.price}/>
            )
        })
    }
    const products = dummyProducts
    const productComponents = productsToComponents(products)
    return (
        <List.Section>
            <List.Subheader>Products for hair type {hairType}</List.Subheader>
            {productComponents}
        </List.Section>
    )
}

export default Products