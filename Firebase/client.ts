// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// REMOVED: import { getFirestore } from "firebase-admin/firestore"; ❌
// You don't need Firestore in the client - admin handles it on the server

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwhGw9AOnpwhJhZPfHBdShhNd9mbfYBbw",
  authDomain: "interviewai-ac829.firebaseapp.com",
  projectId: "interviewai-ac829",
  storageBucket: "interviewai-ac829.firebasestorage.app",
  messagingSenderId: "419920201937",
  appId: "1:419920201937:web:cd3710af643e11f6ffddf0",
  measurementId: "G-BV7TZ40CD4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);