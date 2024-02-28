// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtHjL4qgEd5W7-7teo10XfiGOBgxCJrSA",
  authDomain: "lovinglegacy-24acc.firebaseapp.com",
  projectId: "lovinglegacy-24acc",
  storageBucket: "lovinglegacy-24acc.appspot.com",
  messagingSenderId: "961140288407",
  appId: "1:961140288407:web:4137dd87c42b8dec13b2d2",
  measurementId: "G-TTJBVNMJJH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
