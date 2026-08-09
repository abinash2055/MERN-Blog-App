// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEvn("VITE_FIREBASE_API"),
  authDomain: "blog-mern-41ac4.firebaseapp.com",
  projectId: "blog-mern-41ac4",
  storageBucket: "blog-mern-41ac4.firebasestorage.app",
  messagingSenderId: "732662783772",
  appId: "1:732662783772:web:33f377122baefa9b1424d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider}