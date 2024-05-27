// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCls_unGXpuqPjitV-cAkYRoUTNZWYddd8",
  authDomain: "crmproject-f1f84.firebaseapp.com",
  projectId: "crmproject-f1f84",
  storageBucket: "crmproject-f1f84.appspot.com",
  messagingSenderId: "573068894542",
  appId: "1:573068894542:web:e7c38da98ea9adf7fa7e1f",
  measurementId: "G-PGCC2G1XDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth =getAuth()
export default app

