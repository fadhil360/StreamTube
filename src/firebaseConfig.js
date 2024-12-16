import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // For Firestore
import { getAuth } from "firebase/auth";
// Uncomment below for Realtime Database
// import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };
  
  export default firebaseConfig;
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // For Firestore
export const auth = getAuth(app);
// Uncomment below for Realtime Database
// export const db = getDatabase(app);
