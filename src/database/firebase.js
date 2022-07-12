import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import {getAuth} from 'firebase/auth';
/*const firebaseConfig = {
  apiKey: "AIzaSyC-n4fR96D2J5GaTLiICHmNIvV7mCCCcMY",
  authDomain: "widdall.firebaseapp.com",
  projectId: "widdall",
  storageBucket: "widdall.appspot.com",
  messagingSenderId: "1079934915434",
  appId: "1:1079934915434:web:cd8893adac70e9c8188b13",
  measurementId: "G-GSNBHKGD3V"
};*/
const firebaseConfig={
  apiKey: "AIzaSyCe9AFCOQ1pf00xg2GYFSHdZ0R0WsCqHTg",
    authDomain: "rinrin-7d3d4.firebaseapp.com",
    projectId: "rinrin-7d3d4",
    storageBucket: "rinrin-7d3d4.appspot.com",
    messagingSenderId: "325462402381",
    appId: "1:325462402381:web:ec22d6e9d1e2fdf28e8304",
    measurementId: "G-QYX45K634S",
}
var app = firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true, merge:true });
const db = app.firestore();
const auth = app.auth();
const get_auth = getAuth();
export default{
    firebase,
    db,
    get_auth,
    auth
};

