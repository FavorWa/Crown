import { View, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from "react-native"
import { Style } from "react-native-paper/lib/typescript/components/List/utils"
import { Text, TouchableRipple, List, ActivityIndicator, SegmentedButtons} from "react-native-paper"
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from the correct package
import { useState, useEffect } from "react"
import openWebPage from "../functions/openWebPage"
import { Platform } from "react-native"
import callApi from "../functions/callApi";

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

    /*
    // working on custom products card
    return (
        <TouchableOpacity onPress={handleProductPress}>
            <Image 
                source={{
                    uri: image,
                    method: 'GET'
                }}
                style={{width: 64, height: 64}}
            />
            <Text>{title}</Text>
            <Text>{price}</Text>

        </TouchableOpacity>
    )
    */
    return (
        <List.Item
            onPress={handleProductPress}
            title={title}
            titleNumberOfLines={5}
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


let ProductsPage = () => {

    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [hairType, setHairType] = useState("");
    const [productType, setProductType] = useState("");
    const [email, setEmail] = useState(null);

    const getProducts = async () => {
        try {
            const url = `${backend_base_url}/products/${hairType}/${productType}`
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } 
        
        catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        (async () => {
            const email = await AsyncStorage.getItem('userEmail');
            const password = await AsyncStorage.getItem('userPassword');
            setEmail(email);

            // get and set hair type
            if (email && password) {
                const reqBody = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email, password
                    }),
                }
        
                const userInfo = await callApi(`/get_user_info`, reqBody);
                const type = userInfo["hairType"];
                console.log(`hair type: ${type}`);
                setHairType(type);  
                setProductType("Shampoo");          
            }

            else {
                setHairType("2A");
                setProductType("Shampoo");
            }
        })();

        return () => {
            setEmail("");
            setHairType("");
            setProductType("");
            setLoading(true);
        }
    }, []);

    useEffect(() => {
        if (hairType != "" && productType != "") {
            getProducts();
        }
    }, [hairType, productType]);
      
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

    const handleProductTypeChange = (value: string) => {
        setLoading(true);
        setProductType(value);
    }

    const hairTypeValues = ["2A", "2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C"];
    const productTypeValues = ["Shampoo", "Conditioner", "Hair Moisturizer", "Hair Oils", "Hair Gel", "Hair Mousse"];

    const hairTypeButtons = hairTypeValues.map((type) => {
        return {
            value: type, 
            label: type, 
            style: {
                borderRadius: 0,
                backgroundColor: hairType == type ? "#EDE0D4" : "white"
            }
        }
    });

    const productTypeButtons = productTypeValues.map((type) => {
        return {
            value: type, 
            label: type, 
            style: {
                borderRadius: 0,
                backgroundColor: productType == type ? "#EDE0D4" : "white"
            }
        }
    })



    if (isLoading) {
        return <ActivityIndicator />
    }

    else {
        const productComponents = productsToComponents(products)
        return (
            <View style={{marginTop: 49}}>
                <SafeAreaView>
                    {
                        !email ? (
                            <ScrollView horizontal>
                                <SegmentedButtons
                                    value={hairType}
                                    onValueChange={handleValueChange}
                                    buttons={hairTypeButtons}
                                    style={{marginBottom: 10}}
                                    theme={{roundness: 0}}
                                />
                            </ScrollView>
                        ) : null
                    }

                    <ScrollView horizontal>
                        <SegmentedButtons
                            value={productType}
                            onValueChange={handleProductTypeChange}
                            buttons={productTypeButtons}
                            theme={{roundness: 0}}
                        />
                    </ScrollView>
                </SafeAreaView>

                <ScrollView>
                    <List.Section>
                        <List.Subheader style={styles.listSubheader}>{productType} products for {hairType} hair</List.Subheader>
                        {productComponents}
                    </List.Section>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listSubheader: {
        color: "#713200",
        fontSize: 20, 
        textAlign: "center"
    },
})
export default ProductsPage;