import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyCDK_BzNmjRoVb_n-Byh877knhEW0c6GVY",
    authDomain: "letmeask-60915.firebaseapp.com",
    databaseURL: "https://letmeask-60915-default-rtdb.firebaseio.com",
    projectId: "letmeask-60915",
    storageBucket: "letmeask-60915.appspot.com",
    messagingSenderId: "1048461708495",
    appId: "1:1048461708495:web:4d463d30728af6d373bbba"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();