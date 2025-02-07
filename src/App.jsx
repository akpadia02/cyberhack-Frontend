import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

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
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <SignedIn>
            <SaveUser /> {/* Ensures user is saved in Firestore */}
            <Home />
          </SignedIn>
        } />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/news" element={<NewsCarousel />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route
          path="/profile-analysis"
          element={
            <ProfileAnalysis />
          }
        />
        <Route
          path="/message-spam-detector"
          element={
            <MessageSpamDetector/>
          }
        />
        <Route
          path="/image-spam-detector"
          element={
              <ImageSpamDetection />
          }
        />

        {/* Redirect if not signed in */}
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
