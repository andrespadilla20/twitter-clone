// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5dHOQkfkdJyGQ-F1Aq6BjeaCKHxXKVJw",
  authDomain: "twitter-clone-80928.firebaseapp.com",
  projectId: "twitter-clone-80928",
  storageBucket: "twitter-clone-80928.appspot.com",
  messagingSenderId: "726209428138",
  appId: "1:726209428138:web:6b2a1f6c8cd3aecc092ed3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore(app);

