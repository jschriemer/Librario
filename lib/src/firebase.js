import firebase from 'firebase';
import firestore from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyCJr-sm1-MjdZrDkNPaRAHK4y_CkCaIIxA",
  authDomain: "library-account.firebaseapp.com",
  databaseURL: "https://library-account.firebaseio.com",
  projectId: "library-account",
  storageBucket: "library-account.appspot.com",
  messagingSenderId: "447166911563",
  appId: "1:447166911563:web:eaad97a26f804b3366e9ce",
  measurementId: "G-5J5VDPC4PE"
  };

// Initialize Firebase
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;
