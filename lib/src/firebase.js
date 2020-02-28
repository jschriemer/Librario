import firebase from 'firebase';
import firestore from 'firebase/firestore';

const config = {
  
  };

// Initialize Firebase
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;
