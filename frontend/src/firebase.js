// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// sb bdiya hai
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tech-trendz-3b506.firebaseapp.com",
  projectId: "tech-trendz-3b506",
  storageBucket: "tech-trendz-3b506.firebasestorage.app",
  messagingSenderId: "551486774670",
  appId: "1:551486774670:web:8c33f3db7519b17d60d8df"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);