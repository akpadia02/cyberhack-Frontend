import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { scheduleDailyNotifications } from './components/notificationService';

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import NewsCarousel from "./components/NewsCarousel";
import ProfileAnalysis from "./components/ProfileAnalysis";
import MessageSpamDetector from "./components/MessageSpamDetector";
import ImageSpamDetection from "./components/ImageSpamDetection";
import Contact from "./components/Contact";
import Pricing from "./components/Pricing";
import SignInPage from "./components/SignIn";
import SignUpPage from "./components/SignUp";
import QuizTrivia from "./components/Trivia";

// ✅ Function to save user data in Firestore
const saveUserToFirestore = async (user, getToken) => {
  if (!user || !user.id) {
    console.error("❌ User data is missing or user is not authenticated.");
    return;
  }

  try {
    console.log("🔍 Fetching Clerk token...");
    const token = await getToken();

    if (!token) {
      console.error("❌ No Clerk token received.");
      return;
    }

    console.log("🔹 Clerk Token Retrieved:", token.substring(0, 10) + "...");

    const userRef = doc(db, "users", user.id);
    console.log("📂 Firestore User Document Reference:", userRef.path);

    await setDoc(
      userRef,
      {
        id: user.id,
        name: user.username || "Unknown",
        email: user.primaryEmailAddress?.emailAddress || "No Email",
        profileImage: user.imageUrl || "",
        phoneNo: user.phoneNumber || "",
        createdAt: new Date().toISOString(),
      },
      { merge: true }
    );

    console.log("✅ User saved successfully in Firestore!");
  } catch (error) {
    console.error("❌ Firestore error:", error.message);
  }
};

// ✅ Component to handle user saving
const SaveUser = () => {
  const { user } = useUser();
  const { getToken } = useAuth(); // Get token function from Clerk

  useEffect(() => {
    if (user) {
      console.log("🔍 Saving user:", user);
      saveUserToFirestore(user, getToken);
    }
  }, [user]);

  return null; // This component does not render anything
};

function App() {
  useEffect(() => {
    scheduleDailyNotifications();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* ✅ Home is accessible to both signed-in and signed-out users */}
        <Route path="/" element={<Home />} />

        {/* 🔐 Protected Routes - Require Sign In */}
        <Route path="/about-us" element={<SignedIn><AboutUs /></SignedIn>} />
        <Route path="/news" element={<SignedIn><NewsCarousel /></SignedIn>} />
        <Route path="/contact" element={<SignedIn><Contact /></SignedIn>} />
        <Route path="/pricing" element={<SignedIn><Pricing /></SignedIn>} />
        <Route path="/trivia" element={<SignedIn><QuizTrivia /></SignedIn>} />

        {/* 🔐 Authentication Pages */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {/* 🔐 Restricted Functionalities - Requires Sign In */}
        <Route path="/profile-analysis" element={<SignedIn><ProfileAnalysis /></SignedIn>} />
        <Route path="/message-spam-detector" element={<SignedIn><MessageSpamDetector /></SignedIn>} />
        <Route path="/image-spam-detector" element={<SignedIn><ImageSpamDetection /></SignedIn>} />

        {/* 🔄 Redirect to Sign In if trying to access a protected route */}
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
