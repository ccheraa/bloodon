// Import the functions you need from the SDKs you need
import { QueryClient } from '@tanstack/react-query';
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

console.log("firebaseConfig", firebaseConfig);

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = firebase.firestore();

export const query = new QueryClient();
