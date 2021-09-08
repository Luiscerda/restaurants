import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDa1ZVGEA6l3oA1GdLuW4ky22p9qN_ORVU",
    authDomain: "restaurants-67ff5.firebaseapp.com",
    projectId: "restaurants-67ff5",
    storageBucket: "restaurants-67ff5.appspot.com",
    messagingSenderId: "878129543806",
    appId: "1:878129543806:web:10eab9a0dbb359ed83762f"
  };
  
  export const firebaseApp = firebase.initializeApp(firebaseConfig);