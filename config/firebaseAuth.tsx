import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY", // Replace with your Firebase API key
    authDomain: "bookb-b883b.firebaseapp.com",
    projectId: "bookb-b883b",
    storageBucket: "bookb-b883b.appspot.com",
    messagingSenderId: "27072903025",
    appId: "1:27072903025:web:522fd2901a8b1fc88668d0",
    measurementId: "G-P5LHMMP224",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export { auth };
