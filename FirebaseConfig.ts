// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const fingerprint = "ABC"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBsVs4pJlM8XdsErGiec_u01rf7FXnd1jg",
  authDomain: "vibelap-23.firebaseapp.com",
  projectId: "vibelap-23",
  storageBucket: "vibelap-23.firebasestorage.app",
  messagingSenderId: "818671960773",
  appId: "1:818671960773:web:b6bbe58f7e62b1799466ac",
  measurementId: "G-2B8BG5GBCW"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);;