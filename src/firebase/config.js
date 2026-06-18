import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDvXa8N88Adg52Tte7IIDwRx7NUGAKM5dk",
  authDomain: "nancycinema-fd3c7.firebaseapp.com",
  projectId: "nancycinema-fd3c7",
  storageBucket: "nancycinema-fd3c7.firebasestorage.app",
  messagingSenderId: "955113612161",
  appId: "1:955113612161:web:ba73f2835ae50c79c33e80",
  measurementId: "G-5R6FKWTXPQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };