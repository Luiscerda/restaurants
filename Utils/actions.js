import {firebaseApp}from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.default.firestore(firebaseApp)

export const isUserLogged = () => {
    let isLogged = false
    firebase.default.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
    return isLogged
}