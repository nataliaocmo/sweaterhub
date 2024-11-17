// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAItCwtQa0acZhV1kzYjjbbonI103klGFs",
  authDomain: "swetterhub.firebaseapp.com",
  projectId: "swetterhub",
  storageBucket: "swetterhub.firebasestorage.app",
  messagingSenderId: "660996356059",
  appId: "1:660996356059:web:63420cbb532eb2224259fe",
  measurementId: "G-8QY85CHSM7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);