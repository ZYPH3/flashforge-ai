// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeHlMVkCwDU-pJC_iPLOMXZ-6DcDjhIus",
  authDomain: "flashcard-ai-a86a3.firebaseapp.com",
  projectId: "flashcard-ai-a86a3",
  storageBucket: "flashcard-ai-a86a3.appspot.com",
  messagingSenderId: "639375326978",
  appId: "1:639375326978:web:8f807b6b90d98f81eb4c1b",
  measurementId: "G-9MZM1HCVH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}