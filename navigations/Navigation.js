import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements/dist/icons/Icon'

import Restaurants from '../screens/Restaurants'
import Favorites from '../screens/Favorites'
import TopRestaurants from '../screens/TopRestaurants'
import Search from '../screens/Search'
import AccountStack from './AccountStack'
import RestaurantsStack from './RestaurantsStack'

const Tab = createBottomTabNavigator()

export default function Navigations() {

    const screenOptions = (route, color) => {
        let iconName
        switch (route.name) {
            case "restaurants":
                iconName = "compass-outline"
                break;
            case "favorites":
                iconName = "heart-outline"
                break;
            case "top-restaurants":
                iconName = "star-outline"
                break;
            case "search":
                iconName = "magnify"
                break;
            case "account":
                iconName = "home-outline"
                break;
        }
        return (
            <Icon
                type="material-community"
                name={iconName}
                size={22}
                color={color}
            />
        )
    }
    return (
       <NavigationContainer>
           <Tab.Navigator 
                initialRouteName="restaurants" 

                screenOptions={({ route}) => ({
                    tabBarInactiveTintColor: "#a17dc3", 
                    tabBarActiveTintColor: "#442484",
                    tabBarIcon: ({color}) => screenOptions(route, color)
                })}
            >
                <Tab.Screen
                    name="restaurants"
                    component={RestaurantsStack}
                    options={{title: "Restaurantes"}}
                />
                <Tab.Screen
                    name="favorites"
                    component={Favorites}
                    options={{title: "Favoritos"}}
                />
                <Tab.Screen
                    name="top-restaurants"
                    component={TopRestaurants}
                    options={{title: "Top 5"}}
                />
                <Tab.Screen
                    name="search"
                    component={Search}
                    options={{title: "Buscar"}}
                />
                <Tab.Screen
                    name="account"
                    component={AccountStack}
                    options={{ title: "Cuenta" }}
                />
           </Tab.Navigator>
       </NavigationContainer>
    )
}
