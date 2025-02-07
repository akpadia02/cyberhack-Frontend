const Contact = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center mt-12">
            <h1 className="text-3xl font-bold">📩 Contact Us</h1>
            <p className="mt-4 text-gray-600 max-w-md">
                Have questions or concerns? Feel free to reach out to us.
            </p>
            
            <div className="mt-6 w-full max-w-lg p-6 bg-gray-100 rounded-lg shadow-md">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 border rounded-lg mb-4"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 border rounded-lg mb-4"
                />
                <textarea
                    placeholder="Your Message"
                    className="w-full p-3 border rounded-lg mb-4 h-32"
                ></textarea>
                <button
                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700"
                >
                    Send Message
                </button>
            </div>

            <div className="mt-8 text-gray-600">
                <p>📍 Location: Mumbai, India</p>
                <p>📞 Phone: +91 98765 43210</p>
                <p>✉️ Email: support@example.com</p>
            </div>
        </div>
    );
};

export default Contact;