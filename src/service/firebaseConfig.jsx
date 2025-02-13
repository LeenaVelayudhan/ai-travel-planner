// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQrk95qBUESCJRKszK8hRh-p9UdKwCbPc",
    authDomain: "ai-travel-planner-31ef3.firebaseapp.com",
    projectId: "ai-travel-planner-31ef3",
    storageBucket: "ai-travel-planner-31ef3.firebasestorage.app",
    messagingSenderId: "292355240748",
    appId: "1:292355240748:web:50198ed9eab24c0e4cb289",
    measurementId: "G-2BV6F0KZ1L"
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);