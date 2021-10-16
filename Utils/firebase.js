import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAZ8pQrH1GcteCwyvUkta4MjBONwqY1jvw",
    authDomain: "restaurants-ccebf.firebaseapp.com",
    projectId: "restaurants-ccebf",
    storageBucket: "restaurants-ccebf.appspot.com",
    messagingSenderId: "918014316885",
    appId: "1:918014316885:web:c987f5f55133f37001dfdc"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);

// const firebaseConfig = {
//     apiKey: "AIzaSyDa1ZVGEA6l3oA1GdLuW4ky22p9qN_ORVU",
//     authDomain: "restaurants-67ff5.firebaseapp.com",
//     projectId: "restaurants-67ff5",
//     storageBucket: "restaurants-67ff5.appspot.com",
//     messagingSenderId: "878129543806",
//     appId: "1:878129543806:web:10eab9a0dbb359ed83762f"
//   };
  
//   export const firebaseApp = firebase.initializeApp(firebaseConfig);