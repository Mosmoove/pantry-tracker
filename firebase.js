// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import {getFirestore} from 'firebase/firestore'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtdK_MM-04cDXDozzKCgclxO34AdQe4yw",
  authDomain: "pantryapp-bab70.firebaseapp.com",
  projectId: "pantryapp-bab70",
  storageBucket: "pantryapp-bab70.appspot.com",
  messagingSenderId: "691416006063",
  appId: "1:691416006063:web:0bb69fc54672e31cdd435a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}