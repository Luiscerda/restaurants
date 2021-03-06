import {firebaseApp}from './firebase'
import { FireSQL } from 'firesql'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { map } from 'lodash'

import { fileToBlob } from './helpers'

const db = firebase.default.firestore(firebaseApp)
const fireSql = new FireSQL(firebase.firestore(), { includeId: "id" })

export const isUserLogged = () => {
    let isLogged = false
    firebase.default.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
    return isLogged
}

export const getCurrentUser = ()  => {
    return firebase.default.auth().currentUser
}

export const closeSession = ()  => {
    return firebase.default.auth().signOut()
}

export const registerUser = async(email,password) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.default.auth().createUserWithEmailAndPassword(email,password)
    } catch (error) {
        result.statusResponse = false;
        result.error = "Este correo ya ha sido registrado."
    }
    return result
}

export const loginWithEmailAndPassword = async(email,password) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.default.auth().signInWithEmailAndPassword(email,password)
    } catch (error) {
        result.statusResponse = false;
        result.error = "Usuario o contraseña no validos."
    }
    return result
}

export const uploadImage = async(image, path, name) => {
    const result = { statusResponse: false, error: null, url: null}
    const ref = firebase.default.storage().ref(path).child(name)
    const blob = await fileToBlob(image)

    try {
        await ref.put(blob)
        const url = await firebase.default.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    } catch (error) {
        result.error = error
    }
    return result
}

export const updateProfile = async(data) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.default.auth().currentUser.updateProfile(data)
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const reauthenticate = async(password) => {
    const result = { statusResponse: true, error: null}
    const user = getCurrentUser()
    const credentials = firebase.default.auth.EmailAuthProvider.credential(user.email, password)
    try {
        await user.reauthenticateWithCredential(credentials)
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const updateEmail = async(email) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.default.auth().currentUser.updateEmail(email)
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const updatePassword = async(password) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.default.auth().currentUser.updatePassword(password)
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const addDocumentWithOutId = async(collection, data) => {
    const result = { statusResponse: true, error: null}
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const getRestaurants = async(limitRestaurants) => {
    const result = { statusResponse: true, error: null, restaurants: [], startRestaurant: null}
    try {
        const response = await db.collection("restaurants").orderBy("createAt", "desc").limit(limitRestaurants).get()
        if (response.docs.length > 0) {
            result.startRestaurant = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const restaurant = doc.data()
            restaurant.id = doc.id
            result.restaurants.push(restaurant)
        })
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const getMoreRestaurants = async(limitRestaurants, startRestaurant) => {
    const result = { statusResponse: true, error: null, restaurants: [], startRestaurant: null}
    try {
        const response = await db
            .collection("restaurants")
            .orderBy("createAt", "desc").startAfter(startRestaurant.data().createAt)
            .limit(limitRestaurants).get()
        if (response.docs.length > 0) {
            result.startRestaurant = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const restaurant = doc.data()
            restaurant.id = doc.id
            result.restaurants.push(restaurant)
        })
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const getDocumenById = async(collection, id) => {
    const result = { statusResponse: true, error: null, document: null}
    try {
        const response = await db.collection(collection).doc(id).get()
        result.document =  response.data()
        result.document.id = response.id
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const updateDocument = async(collection, id, data) => {
    const result = { statusResponse: true, error: null}
    try {
        await db.collection(collection).doc(id).update(data)
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const getRestaurantsReviews = async(id) => {
    const result = { statusResponse: true, error: null, reviews: []}
    try {
        const response = await db.collection("reviews").where("idRestaurant", "==", id).get()
        response.forEach((doc) => {
            const review = doc.data()
            review.id = doc.id
            result.reviews.push(review)
        })
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const getIsFavorite = async(idRestaurant) => {
    const result = { statusResponse: true, error: null, isFavorite: false}
    try {
       const response = await db.collection("favorites")
            .where("idRestaurant", "==", idRestaurant)
            .where("idUser", "==", getCurrentUser().uid)
            .get()
        result.isFavorite = response.docs.length > 0

    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const removeFavorite = async(idRestaurant) => {
    const result = { statusResponse: true, error: null}
    try {
       const response = await db.collection("favorites")
            .where("idRestaurant", "==", idRestaurant)
            .where("idUser", "==", getCurrentUser().uid)
            .get()
        response.forEach(async(doc) => {
            const favoriteId = doc.id
            await db.collection("favorites").doc(favoriteId).delete()
        })
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const getFavorites = async() => {
    const result = { statusResponse: true, error: null, favorites: []}
    try {
       const response = await db.collection("favorites")
            .where("idUser", "==", getCurrentUser().uid)
            .get()
        await Promise.all(
            map(response.docs, async(doc) => {
                const favorite = doc.data()
                const response2 = await  getDocumenById("restaurants", favorite.idRestaurant)
                if (response2.statusResponse) {
                    result.favorites.push(response2.document)
                }
            })
        )
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const getTopRestaurants = async(limit) => {
    const result = { statusResponse: true, error: null, restaurants: []}
    try {
       const response = await db.collection("restaurants")
            .orderBy("rating", "desc")
            .limit(limit)
            .get()
        
            response.forEach((doc) => {
                const restaurant = doc.data()
                restaurant.id = doc.id
                result.restaurants.push(restaurant)
            })

    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}

export const searchRestaurants = async(criterial) => {
    const result = { statusResponse: true, error: null, restaurants: []}
    try {
       result.restaurants = await fireSql.query(`SELECT * FROM restaurants WHERE name LIKE '${criterial}%'`)

    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}