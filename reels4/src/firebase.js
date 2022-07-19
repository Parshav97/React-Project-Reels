// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbJr633_rfnQvcYC7Etn_hLMCK8pRgo5c",
  authDomain: "reels-pepcoding.firebaseapp.com",
  projectId: "reels-pepcoding",
  storageBucket: "reels-pepcoding.appspot.com",
  messagingSenderId: "652826634536",
  appId: "1:652826634536:web:4fed54a15f21c14f9a081d"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth()

const firestore = firebase.firestore()
export const database = {
  users : firestore.collection('users'),
  posts : firestore.collection('posts'),
  comments : firestore.collection('comments'),
  getTimeStamp : firebase.firestore.FieldValue.serverTimestamp,
}

export const storage = firebase.storage()