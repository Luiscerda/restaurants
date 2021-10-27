import React, { useState, useCallback } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import moment from 'moment/min/moment-with-locales'
import firebase from 'firebase/app'
import { Avatar, Button, Rating } from 'react-native-elements'
import { map, size } from 'lodash'
import { useFocusEffect } from '@react-navigation/native'

import { getRestaurantsReviews } from '../../Utils/actions'

moment.locale("es")

export default function ListReviews({ navigation, idRestaurant }) {
    const [userLogged, setUserLogged] = useState(false)
    const [reviews, setReviews] = useState([])

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    })

    useFocusEffect(
        useCallback(() => {
            (async() => {
                const response = await getRestaurantsReviews(idRestaurant)
                if (response.statusResponse) {
                    setReviews(response.reviews)
                }
            })()
        },[])
    )
    return (
        <View>
            {
                userLogged ? (
                    <Button
                        title="Escribe una opinion"
                        titleStyle={styles.btnTitleReview}
                        buttonStyle={styles.btnAddReview}
                        onPress={() => navigation.navigate("add-review-restaurant", {idRestaurant: idRestaurant})}
                        icon={{
                            type: "material-community",
                            name: "square-edit-outline",
                            color: "#a376c7"
                        }}
                    />
                ) : (
                    <Text style={styles.mustLoginText} onPress={() => navigation.navigate("login")}>
                        Para escribir una opinion es necesario estar logueado. {" "}
                        <Text style={styles.loginText}>
                            Pulsa AQUI para iniciar sesion
                        </Text>
                    </Text>
                )
            }
            {
                size(reviews) > 0 && (
                    map(reviews, review => (
                        <Review
                            _review={review}
                        />
                    ))
                )
            }
        </View>
    )
}

function Review({ _review }) {
    const { title, review, createAt, avatar, rating} = _review
    const createReview = new Date(createAt.seconds * 1000)
    return(
        <View style={styles.viewReview}>
            <View style={styles.imageAvatar}>
                <Avatar
                    rounded
                    renderPlaceholderContent={<ActivityIndicator color="#fff"/>}
                    size="large"
                    containerStyle={styles.avatarUser}
                    source={
                        avatar
                            ? { uri: avatar}
                            : require("../../assets/avatar-default.jpg")
                    }
                />
            </View>
            <View style={styles.viewInfo}>
                    <Text style={styles.reviewTitle}>{title}</Text>
                    <Text style={styles.reviewText}>{review}</Text>
                    <Rating
                        imageSize={15}
                        startingValue={rating}
                        readonly
                    />
                    <Text style={styles.reviewDate}>{moment(createReview).format("LLL")}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnAddReview:{
        backgroundColor: "transparent"
    },
    btnTitleReview:{
        color: "#a376c7"
    },
    mustLoginText:{
        textAlign: "center",
        color: "#a376c7",
        padding: 20
    },
    loginText:{
        fontWeight: "bold"
    },
    viewReview:{
        flexDirection: "row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },
    imageAvatar:{
        marginRight: 15
    },
    avatarUser:{
        width: 50,
        height: 50
    },
    viewInfo:{
        flex: 1,
        alignItems: "flex-start"
    },
    reviewTitle:{
        fontWeight: "bold"
    },
    reviewText:{
        paddingTop: 2,
        color: "gray",
        marginBottom: 5
    },
    reviewDate:{
        marginTop: 5,
        color: "gray",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0
    }
})
