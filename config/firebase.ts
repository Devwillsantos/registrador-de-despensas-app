// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2naJiPXRKfmV__kncQag7sUFqNz1gSZI",
  authDomain: "expense-tracker-ee165.firebaseapp.com",
  projectId: "expense-tracker-ee165",
  storageBucket: "expense-tracker-ee165.firebasestorage.app",
  messagingSenderId: "313985431681",
  appId: "1:313985431681:web:57332403865b76d6d73580"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// auth
export const auth = getAuth(app)

// db
export const firestore = getFirestore(app)
