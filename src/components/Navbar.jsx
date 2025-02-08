import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { isSignedIn } = useUser();
    const location = useLocation(); // Get current path

    // Redirect unauthenticated users to sign-in page
    const handleProtectedClick = (path) => {
        setIsOpen(false);
        if (!isSignedIn) {
            navigate("/sign-in");
        } else {
            navigate(path);
        }
    };

    return (
        <nav className="bg-white fixed w-full top-0 z-50 shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Left: Logo + Name */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl">👻</span>
                    <span className="text-xl font-semibold">ImposterX</span>
                </div>

                {/* Center: Navigation */}
                <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
                    {["/", "/About-us", "/News", "/Quiz", "/Contact"].map((path, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handleProtectedClick(path)}
                                className={`px-3 py-1 rounded-md transition-all ${
                                    location.pathname === path ? "text-blue-500 font-semibold" : "hover:text-blue-500"
                                }`}
                            >
                                {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Right: Authentication */}
                <div className="hidden md:flex gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="border px-4 py-1 rounded-md hover:bg-gray-100">Log in</button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                                Start Free Trial
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(true)}>
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="fixed right-0 top-0 h-full w-2/3 bg-white shadow-lg flex flex-col items-start py-10 px-6 gap-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="absolute top-4 right-4 text-2xl" onClick={() => setIsOpen(false)}>
                                &times;
                            </button>

                            {["/", "/About-us", "/News", "/Quiz", "/Contact"].map((path, index) => (
                                <Link
                                    key={index}
                                    to={path}
                                    onClick={() => handleProtectedClick(path)}
                                    className={`text-lg transition-all ${
                                        location.pathname === path ? "text-blue-500 font-semibold" : "hover:text-blue-500"
                                    }`}
                                >
                                    {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
                                </Link>
                            ))}

                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="border px-6 py-2 rounded-md hover:bg-gray-100 w-full text-left">
                                        Log in
                                    </button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 w-full text-left">
                                        Start Free Trial
                                    </button>
                                </SignUpButton>
                            </SignedOut>

                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
