import * as firebase from "firebase"
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAJ2auv2Qff10VNltdQ7JB8KZkSCa00MpA",
    authDomain: "sms-scheduler-e572e.firebaseapp.com",
    databaseURL: "https://sms-scheduler-e572e.firebaseio.com",
    projectId: "sms-scheduler-e572e",
    storageBucket: "sms-scheduler-e572e.appspot.com",
    messagingSenderId: "657957074757",
    appId: "1:657957074757:web:9f1bf9c9d785f5ed87302c"
};

const firebaseApp = firebase.app.length > 0 ?
    firebase.initializeApp(firebaseConfig)
    :
    firebase.app()

const db = firebaseApp.firestore()
//export default db;
export { db, firebase }


