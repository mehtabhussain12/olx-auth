 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
  import {getAuth} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js'
  import {getFirestore} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js'
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyANeBWYrgo-lXuk6GzeIQKdVRsoLpWoAy4",
    authDomain: "olx-auth-13cfb.firebaseapp.com",
    projectId: "olx-auth-13cfb",
    storageBucket: "olx-auth-13cfb.firebasestorage.app",
    messagingSenderId: "344309042155",
    appId: "1:344309042155:web:c8284685373a9db027e7ae",
    measurementId: "G-P5X5MFQHT0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
const db = getFirestore(app);
  export { app, analytics, auth, db };