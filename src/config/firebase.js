// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMdgIu3DOt5smSkh6iJzjOseRa43WEktI",
  authDomain: "wealth-map-1fa80.firebaseapp.com",
  projectId: "wealth-map-1fa80",
  storageBucket: "wealth-map-1fa80.firebasestorage.app",
  messagingSenderId: "642785576332",
  appId: "1:642785576332:web:ea3811c4ce4b84b13ac2a9",
  measurementId: "G-W01YH4R6C7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
