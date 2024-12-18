// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAx6HqzB2biQXa9yTu90IWBegI9NgjZD64",
  authDomain: "sociallogins-fa2ae.firebaseapp.com",
  projectId: "sociallogins-fa2ae",
  storageBucket: "sociallogins-fa2ae.firebasestorage.app",
  messagingSenderId: "591537081688",
  appId: "1:591537081688:web:163f60bdd5a8f17a1fa92d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth
