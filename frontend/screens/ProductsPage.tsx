import { View, Image, SafeAreaView, ScrollView } from "react-native"
import { Style } from "react-native-paper/lib/typescript/components/List/utils"
import { Text, TouchableRipple, List, ActivityIndicator, SegmentedButtons} from "react-native-paper"
import { useState, useEffect } from "react"
import openWebPage from "../functions/openWebPage"
import { BACKEND_BASE_URL } from "../secrets"
import { Platform } from "react-native"

interface Product {
    title: string,
    link: string,
    image: string,
    price: string,
}

/*
// Tried to connect to local api through expo go, didn't work

import Constants from "expo-constants";

console.log(Constants?.expoConfig?.hostUri);
const backend_base_url = Constants?.expoConfig?.hostUri
  ? "http://" + Constants.expoConfig.hostUri.split(`:`).shift()?.concat(`:8000`)
  : BACKEND_BASE_URL;

*/

const backend_base_url = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000';

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
let ProductsPage = () => {

    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [hairType, setHairType] = useState("2A");

    const getProducts = async () => {
        try {
            const url = `${backend_base_url}/products/${hairType}`
            console.log(url);
            const response = await fetch(url);
            console.log(response);
            const data = await response.json();
            setProducts(data);
        } 
        
        catch (error) {
            console.error(error);
        }

        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts()
    }, [hairType]);
      
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

    const handleValueChange = (value: string) => {
        setLoading(true);
        setHairType(value);
    }

    const hair_type_values = ["2A", "2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C"]
    const buttons = hair_type_values.map((hair_type) => {
        return {value: hair_type, label: hair_type}
    })

    if (isLoading) {
        return <ActivityIndicator />
    }

    else {
        const productComponents = productsToComponents(products)
        return (
            <>
                <SafeAreaView>
                    <ScrollView horizontal>
                        <SegmentedButtons
                            value={hairType}
                            onValueChange={handleValueChange}
                            buttons={buttons}
                        />
                    </ScrollView>
                </SafeAreaView>

                <ScrollView>
                    <List.Section>
                        <List.Subheader>Products for hair type {hairType}</List.Subheader>
                        {productComponents}
                    </List.Section>
                </ScrollView>
            </>
        )
    }
}

/*
ProductsPage = () => {

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

    let products = dummyProducts
    const productComponents = productsToComponents(products)
    return (
        <>
            <List.Section>
                <List.Subheader>Products good for all hair types</List.Subheader>
                {productComponents}
            </List.Section>
        </>
    )
}
*/
export default ProductsPage;