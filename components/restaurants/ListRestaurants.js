import { size } from 'lodash'
import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native-elements'
import { formatPhone } from '../../Utils/helpers'

export default function ListRestaurants({ restaurants, navigation, handleLoadMore }) {
    return (
        <View>
            <FlatList
                data={restaurants}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={5.8}
                onEndReached={handleLoadMore}
                renderItem={(restaurant) => (
                    <Restaurant 
                        restaurant={restaurant}
                        navigation={navigation}
                    />
                )}
            />
        </View>
    )
}

function Restaurant({ restaurant, navigation}) {
    const { id, images, name, address, description, phone, email, callingCode} = restaurant.item
    const imageRestaurant = images[0]

    const goRestaurant = () => {
        navigation.navigate("restaurant", { id, name })
    }

    return(
        <TouchableOpacity onPress={goRestaurant}>
            <View style={styles.viewRestaurant}>
                <View style={styles.viewImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="#fff"/>}
                        source={{ uri: imageRestaurant}}
                        style={styles.imageRestaurant}
                    />
                </View>
                <View>
                    <Text style={styles.restaurantTitle}>{name}</Text>
                    <Text style={styles.restaurantInformation}>{address}</Text>
                    <Text style={styles.restaurantInformation}>{formatPhone(callingCode, phone)}</Text>
                    <Text style={styles.restaurantDescription}>
                        {
                            size(description.trim()) > 60
                                ? `${description.substr(0, 60).trim()}...`
                                : description.trim()
                        }
                        
                    </Text>
                </View>
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewRestaurant:{
        flexDirection: "row",
        margin: 10
    },
    imageRestaurant:{
        width: 90,
        height: 90
    },
    restaurantTitle:{
        fontWeight: "bold"
    },
    restaurantInformation:{
        paddingTop: 2,
        color: "grey"
    },
    restaurantDescription:{
        paddingTop: 2,
        color: "grey",
        width: "70%"
    },
    viewImage:{
        marginRight: 15
    }
})
