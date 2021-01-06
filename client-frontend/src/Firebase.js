import firebase from "firebase/app";
import "firebase/auth";
// import React from "react";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBQem4ACll5t_B-3kib7cvjhxr4jjxCNWM",
//   authDomain: "ecommerce-e6f9e.firebaseapp.com",
//   projectId: "ecommerce-e6f9e",
//   storageBucket: "ecommerce-e6f9e.appspot.com",
//   messagingSenderId: "40375210512",
//   appId: "1:40375210512:web:01f418107fa11657c5f095",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX4J-MKjSPVaKxJkLf3yqTixE4yi3fe-4",
  authDomain: "ecommerce-website-89285.firebaseapp.com",
  projectId: "ecommerce-website-89285",
  storageBucket: "ecommerce-website-89285.appspot.com",
  messagingSenderId: "225329915388",
  appId: "1:225329915388:web:004307193f004b16233e79",
  measurementId: "G-HJT9G46SRZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const authentication = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
