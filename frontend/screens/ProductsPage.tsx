import { View, Image } from "react-native"
import { Style } from "react-native-paper/lib/typescript/components/List/utils"
import { Text, TouchableRipple, List, Searchbar, RadioButton, ActivityIndicator } from "react-native-paper"
import { useState, useEffect } from "react"
import openWebPage from "../functions/openWebPage"
import { FRONTEND_BASE_URL } from "../secrets"

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
let ProductsPage = () => {

    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [hairType, setHairType] = useState("2A");

    const getProducts = async () => {
        try {
            const url = `${FRONTEND_BASE_URL}/products/${hairType}`
            console.log(url);
            const response = await fetch(url);
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

    if (isLoading) {
        return <ActivityIndicator />
    }

    else {
        const productComponents = productsToComponents(products)
        return (
            <>
                <RadioButton.Group onValueChange={handleValueChange} value={hairType}>
                    <RadioButton.Item label="2A" value="2A" />
                    <RadioButton.Item label="2B" value="2B" />
                    <RadioButton.Item label="2C" value="2C" />
                    <RadioButton.Item label="3A" value="3A" />
                    <RadioButton.Item label="3B" value="3B" />
                    <RadioButton.Item label="3C" value="3C" />
                    <RadioButton.Item label="4A" value="4A" />
                    <RadioButton.Item label="4B" value="4B" />
                    <RadioButton.Item label="4C" value="4C" />
                </RadioButton.Group>
                <List.Section>
                    <List.Subheader>Products for hair type {hairType}</List.Subheader>
                    {productComponents}
                </List.Section>
            </>
        )
    }
}


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
export default ProductsPage;