import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'

import BottomTabs from '../components/home/BottomTabs'
import Categories from '../components/home/Categories'
import HeaderTabs from '../components/home/HeaderTabs'
import RestaurantItems, { localRestaurants } from '../components/home/RestaurantItems'
import SearchBar from '../components/home/SearchBar'

export default function Home({ navigation }) {
    const [restaurantData, setRestaurantData] = useState(localRestaurants);
    const [city, setCity] = useState('San Francisco');
    const [activeTab, setActiveTab] = useState('Delivery');

    const getRestaurantFromYelp = () => {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurant&location=${city}`;

        const yelpOptions = {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
            }
        };

        return fetch(yelpUrl, yelpOptions)
            .then((res) => res.json())
            .then((json) => setRestaurantData(
                json.businesses.filter((busines) => 
                    busines.transactions.includes(activeTab.toLowerCase())
                )
            ));
    };

    useEffect(() => {
        getRestaurantFromYelp();
    }, [city, activeTab]);

    return (
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
            <View style={{ backgroundColor: "white", padding: 15 }}>
                <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
                <SearchBar cityHandler={setCity}/>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Categories />
                <RestaurantItems restaurantData={restaurantData} navigation={navigation}/>
            </ScrollView>
            <Divider width={1} orientation="horizontal" />
            <BottomTabs />
        </SafeAreaView>
    )
}
