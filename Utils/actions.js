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