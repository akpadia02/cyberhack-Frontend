import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5jncW_NzJwDXA8Q0_TXEr6UadsqM-p7k",
  authDomain: "imposterx-906ff.firebaseapp.com",
  projectId: "imposterx-906ff",
  storageBucket: "imposterx-906ff.appspot.com", // 🔹 Fixed storageBucket URL
  messagingSenderId: "8616316045",
  appId: "1:8616316045:web:fc434cf1a63fa93af426c4",
  measurementId: "G-4SSQD8NYFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("✅ Firebase Initialized Successfully");

export { db };
