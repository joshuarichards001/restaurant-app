import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFPEhYIz5pg9CGeax7UmHcGfPTT58fpC4",
  authDomain: "restaurant-app-fe515.firebaseapp.com",
  projectId: "restaurant-app-fe515",
  storageBucket: "restaurant-app-fe515.appspot.com",
  messagingSenderId: "336876183546",
  appId: "1:336876183546:web:5294394bc1eec1173e4e43",
  measurementId: "G-0B4KQ95ENR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
