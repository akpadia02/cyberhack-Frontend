import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

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

// const quizData = [
//   {
//     question: "What is the most common method hackers use to steal login credentials?",
//     options: ["Phishing", "Brute Force Attack", "Keylogging", "DDoS Attack"],
//     answer: "Phishing"
//   },
//   {
//     question: "Which of the following passwords is the strongest?",
//     options: ["password123", "Qwerty2023!", "P@ssw0rd!", "G#8hT^kL!mN0"],
//     answer: "G#8hT^kL!mN0"
//   },
//   {
//     question: "What should you do if you receive an email from an unknown sender with an attachment?",
//     options: [
//       "Open it to check its contents",
//       "Reply to ask for more details",
//       "Delete it without opening",
//       "Forward it to your contacts"
//     ],
//     answer: "Delete it without opening"
//   },
//   {
//     question: "What does 'HTTPS' in a website URL indicate?",
//     options: [
//       "The website is hosted in a secure data center",
//       "The website is secured with encryption",
//       "The website is government-approved",
//       "The website is free from ads"
//     ],
//     answer: "The website is secured with encryption"
//   },
//   {
//     question: "Which of these is an example of two-factor authentication (2FA)?",
//     options: [
//       "Logging in with just a username and password",
//       "Using a fingerprint and a password",
//       "Using the same password across multiple sites",
//       "Sharing your password with a friend"
//     ],
//     answer: "Using a fingerprint and a password"
//   },
//   {
//     question: "Which of the following is a sign of a phishing website?",
//     options: [
//       "Misspelled URLs",
//       "Padlock icon in the address bar",
//       "Shortened URLs from a trusted source",
//       "Proper HTTPS certification"
//     ],
//     answer: "Misspelled URLs"
//   },
//   {
//     question: "What is a VPN used for?",
//     options: [
//       "Hacking into secure networks",
//       "Making your internet faster",
//       "Encrypting your internet connection for privacy",
//       "Blocking advertisements"
//     ],
//     answer: "Encrypting your internet connection for privacy"
//   },
//   {
//     question: "What is the best way to secure your social media accounts?",
//     options: [
//       "Using strong and unique passwords",
//       "Using the same password for all accounts",
//       "Logging in only from public Wi-Fi",
//       "Disabling two-factor authentication"
//     ],
//     answer: "Using strong and unique passwords"
//   },
//   {
//     question: "What should you do if a website asks for your credit card details unexpectedly?",
//     options: [
//       "Enter your details and continue",
//       "Verify the website's legitimacy before proceeding",
//       "Ignore the warning and refresh the page",
//       "Use a friend's credit card instead"
//     ],
//     answer: "Verify the website's legitimacy before proceeding"
//   },
//   {
//     question: "Which of these is a good cybersecurity practice?",
//     options: [
//       "Clicking on pop-up ads to close them",
//       "Installing software only from trusted sources",
//       "Using the same password for all accounts",
//       "Turning off software updates"
//     ],
//     answer: "Installing software only from trusted sources"
//   }
// ];

// // Function to add questions to Firestore
// const addQuizToFirestore = async () => {
//   const quizCollection = collection(db, "cybersecurity_quiz");

//   for (const question of quizData) {
//     await addDoc(quizCollection, question);
//     console.log(`Added question: ${question.question}`);
//   }
// };

// addQuizToFirestore();
