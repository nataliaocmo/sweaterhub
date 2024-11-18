import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tu configuración de Firebase (asegúrate de agregarla aquí)
const firebaseConfig = {
  apiKey: "AIzaSyAItCwtQa0acZhV1kzYjjbbonI103klGFs",
  authDomain: "swetterhub.firebaseapp.com",
  projectId: "swetterhub",
  storageBucket: "swetterhub.firebasestorage.app",
  messagingSenderId: "660996356059",
  appId: "1:660996356059:web:63420cbb532eb2224259fe",
  measurementId: "G-8QY85CHSM7"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Analytics (asegúrate de que Analytics sea compatible con tu entorno)
const analytics = getAnalytics(app);

// Firestore
export const db = getFirestore(app);

// Auth con persistencia para React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});



