import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Link} from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white  fixed w-full top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">

                {/* Left: Logo + Name */}
                <div className="flex items-center gap-2 ">
                    <span className="text-2xl">👻</span>
                    <span className="text-xl font-semibold">ImposterX</span>
                </div>

                {/* Center: Navigation */}


                <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about-us">About</Link></li>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/pricing">Pricing</Link></li>
                </ul>


                {/* Right: Login + Sign Up */}
                <div className="hidden md:flex gap-4">
                    <button className="border px-4 py-1 rounded-md hover:bg-gray-100">Log in</button>
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                        Start Free Trial
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(true)}>
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Drawer (Smooth Slide-in & Slide-out) */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
                        <motion.div
                            initial={{ x: "100%" }} // Start off-screen (right)
                            animate={{ x: 0 }} // Slide in smoothly
                            exit={{ x: "100%" }} // Slide out smoothly
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="fixed right-0 top-0 h-full w-1/2 bg-white shadow-lg flex flex-col items-end py-10 pr-6 gap-6"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                        >
                            <button className="absolute top-4 right-4 text-2xl" onClick={() => setIsOpen(false)}>
                                &times;
                            </button>
                            <a href="#home" className="text-gray-700 text-lg hover:text-blue-500" onClick={() => setIsOpen(false)}>Home</a>
                            <a href="#features" className="text-gray-700 text-lg hover:text-blue-500" onClick={() => setIsOpen(false)}>About</a>
                            <a href="#news" className="text-gray-700 text-lg hover:text-blue-500" onClick={() => setIsOpen(false)}>News</a>
                            <a href="#fraud" className="text-gray-700 text-lg hover:text-blue-500" onClick={() => setIsOpen(false)}>Detect Fraud</a>
                            <a href="#contact" className="text-gray-700 text-lg hover:text-blue-500" onClick={() => setIsOpen(false)}>Contact</a>
                            <button className="border px-6 py-2 rounded-md hover:bg-gray-100  text-right" onClick={() => setIsOpen(false)}>Log in</button>
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600  text-right" onClick={() => setIsOpen(false)}>
                                Start Free Trial
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
