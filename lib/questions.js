import { db } from "./firebase.js"; // Adjust path as needed
import { collection, addDoc } from "firebase/firestore";

const questions = [
    {
        question: "What is the most common method hackers use to steal login credentials?",
        options: ["Phishing", "Brute Force Attack", "Keylogging", "DDoS Attack"],
        answer: "Phishing"
    },
    {
        question: "Which of these is an example of two-factor authentication (2FA)?",
        options: [
            "Logging in with just a username and password",
            "Using a fingerprint and a password",
            "Using the same password across multiple sites",
            "Sharing your password with a friend"
        ],
        answer: "Using a fingerprint and a password"
    },
    {
        question: "Which of the following is a sign of a phishing website?",
        options: [
            "Misspelled URLs",
            "Padlock icon in the address bar",
            "Shortened URLs from a trusted source",
            "Proper HTTPS certification"
        ],
        answer: "Misspelled URLs"
    },
    {
        question: "What does 'HTTPS' in a website URL indicate?",
        options: [
            "The website is hosted in a secure data center",
            "The website is secured with encryption",
            "The website is government-approved",
            "The website is free from ads"
        ],
        answer: "The website is secured with encryption"
    },
    {
        question: "What should you do if you receive an email from an unknown sender with an attachment?",
        options: [
            "Open it to check its contents",
            "Reply to ask for more details",
            "Delete it without opening",
            "Forward it to your contacts"
        ],
        answer: "Delete it without opening"
    }
];

const addQuestionsToFirestore = async () => {
    try {
        const questionsCollection = collection(db, "questions");
        for (const question of questions) {
            await addDoc(questionsCollection, question);
        }
        console.log("Questions added successfully!");
    } catch (error) {
        console.error("Error adding questions: ", error);
    }
};

addQuestionsToFirestore();
