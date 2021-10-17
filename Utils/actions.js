import {firebaseApp}from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

import { fileToBlob } from './helpers'

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