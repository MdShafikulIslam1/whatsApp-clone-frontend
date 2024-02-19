// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBp64ocAShjVa8DmneR6AYsqnTi-lX0Kbs",
  authDomain: "whatsapp-frontend-3187a.firebaseapp.com",
  projectId: "whatsapp-frontend-3187a",
  storageBucket: "whatsapp-frontend-3187a.appspot.com",
  messagingSenderId: "434197274638",
  appId: "1:434197274638:web:1236190bbaaca8cac95c5f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
