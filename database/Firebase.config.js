// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDWCuowcTeVkRARKq6H9TvV4y-gMrIs6bY",
  authDomain: "chatingapp-38661.firebaseapp.com",
  projectId: "chatingapp-38661",
  storageBucket: "chatingapp-38661.firebasestorage.app",
  messagingSenderId: "1034093777116",
  appId: "1:1034093777116:web:efe9c23f53202dadd6e419"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app