import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';


// Initialize Firebase
// require('firebase/database');
var config = {
    apiKey: "AIzaSyB9ZD6271A__HmoYt23iqjJkPUUiCLb_bA",
    authDomain: "project-journal-51fc8.firebaseapp.com",
    databaseURL: "https://project-journal-51fc8.firebaseio.com",
    projectId: "project-journal-51fc8",
    storageBucket: "project-journal-51fc8.appspot.com",
    messagingSenderId: "1008763078069"
};

firebase.initializeApp(config);
export default firebase;