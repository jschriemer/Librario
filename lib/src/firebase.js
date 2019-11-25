import firebase from 'firebase';
import firestore from 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

// Initialize Firebase
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();

export const algoliasearch = require('algoliasearch');
export const dotenv = require('dotenv');
const database = firebase.database();
// load values from the .env file in this directory into process.env
dotenv.config();

// configure algolia
const algolia = algoliasearch(
  '0W8VDF286F',
  "b39ffa013f7b7064aa254560831a0b0e"
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);


// Adding a few contacts
Promise.all([
  database.ref('/contacts').push({
    name: 'Josh',
    city: 'San Francisco'
  }),
  database.ref('/contacts').push({
    name: 'Tim',
    city: 'Paris'
  })]).then(() => {
    console.log("Contacts added to Firebase");
  }).catch(error => {
    console.error("Error adding contacts to Firebase", error);
  });

export default firebase;
