// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAscktvb4R1-iUdCHJoll5en9RaTcQXtNo",
  authDomain: "marinesos.firebaseapp.com",
  projectId: "marinesos",
  storageBucket: "marinesos.firebasestorage.app",
  messagingSenderId: "765560709512",
  appId: "1:765560709512:web:807eaa45a5006458f05a3d",
  measurementId: "G-6G3GM2MRQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Export them
export { app, auth, db, analytics };