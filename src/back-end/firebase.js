import * as firebase from "firebase"
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAg4OFWm5gKuvlS5EkjZsA_bCS0mSlrBOc",
    authDomain: "universidade-nmurfk.firebaseapp.com",
    databaseURL: "https://universidade-nmurfk.firebaseio.com",
    projectId: "universidade-nmurfk",
    storageBucket: "universidade-nmurfk.appspot.com",
    messagingSenderId: "779613761092",
    appId: "1:779613761092:web:56445ee76914ed623dd611"
};

const firebaseApp = firebase.app.length > 0 ?
    firebase.initializeApp(firebaseConfig)
    :
    firebase.app()

const db = firebaseApp.firestore()
//export default db;
export { db, firebase }


