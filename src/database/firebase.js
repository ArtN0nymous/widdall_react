import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyC-n4fR96D2J5GaTLiICHmNIvV7mCCCcMY",
  authDomain: "widdall.firebaseapp.com",
  projectId: "widdall",
  storageBucket: "widdall.appspot.com",
  messagingSenderId: "1079934915434",
  appId: "1:1079934915434:web:cd8893adac70e9c8188b13",
  measurementId: "G-GSNBHKGD3V"
};
var app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const storage = app.storage();
const auth = app.auth();
const get_auth = getAuth();
export default{
    firebase,
    db,
    storage,
    auth,
    get_auth
};

