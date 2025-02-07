"use client";
import React, { useState } from "react";
import { Mail, Instagram, Linkedin } from "lucide-react";

function Footer() {
    const [activeSection, setActiveSection] = useState(null);

    const handleClick = (sectionId) => {
        setActiveSection(sectionId);
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer id="contact-section" className="text-black px-4 md:px-16 py-6 font-playfair mt-10 hidden md:block">
            <div
                className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8 border rounded-xl"
            >
                {/* Contact Information */}
                <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-2xl font-semibold text-blue-400">Contact Information</h3>
                    <p className="text-lg font-bold">Email: <a href="mailto:contact@instaspamdetector.com" className="underline text-blue-400 hover:text-white">contact@instaspamdetector.com</a></p>
                    <p className="text-lg font-bold">Location: India / Global</p>
                    <p className="text-lg font-bold">Follow Us:</p>
                    <div className="flex justify-center md:justify-start space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Instagram className="w-8 h-8 transition-all transform hover:scale-110" />
                        </a>
                        <a href="mailto:contact@instaspamdetector.com" className="text-gray-400 hover:text-white">
                            <Mail className="w-8 h-8 transition-all transform hover:scale-110" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Linkedin className="w-8 h-8 transition-all transform hover:scale-110" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-semibold text-blue-400">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-lg hover:underline hover:text-blue-400" onClick={() => handleClick("hero-section")}>Home</a></li>
                        <li><a href="#" className="text-lg hover:underline hover:text-blue-400" onClick={() => handleClick("about-section")}>About</a></li>
                        <li><a href="#" className="text-lg hover:underline hover:text-blue-400" onClick={() => handleClick("features-section")}>News</a></li>
                        <li><a href="#" className="text-lg hover:underline hover:text-blue-400" onClick={() => handleClick("features-section")}>Contact</a></li>
                    </ul>
                </div>

                {/* Project Information */}
                <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-2xl text-blue-400">About Our Project</h3>
                    <p className="text-lg md:text-base">
                        Our AI-powered Instagram Spam Detection system helps users analyze profiles, detect spam accounts, and prevent fraudulent activity.  
                        Powered by machine learning, it ensures safe and genuine interactions on Instagram.
                    </p>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-500 mt-5 pt-2 text-center text-sm text-gray-700">
                <p>© 2025 InstaSpamDetector. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
