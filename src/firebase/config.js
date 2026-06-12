// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut 
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvXa8N88Adg52Tte7IIDwRx7NUGAKM5dk",
  authDomain: "nancycinema-fd3c7.firebaseapp.com",
  projectId: "nancycinema-fd3c7",
  storageBucket: "nancycinema-fd3c7.firebasestorage.app",
  messagingSenderId: "955113612161",
  appId: "1:955113612161:web:ba73f2835ae50c79c33e80",
  measurementId: "G-5R6FKWTXPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize and Export Firebase Auth
const auth = getAuth(app);

export { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut 
};