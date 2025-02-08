import { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phoneNo.trim()) newErrors.phoneNo = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNo)) newErrors.phoneNo = "Invalid phone number (10 digits required)";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Strong email regex pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setStatus("Please enter a valid email address ❌");
      return;
    }

    setStatus("Sending...");

    try {
      await axios.post("http://localhost:8050/contact", formData);
      setStatus("Message sent successfully! ✅ Check your email for confirmation.");
      setFormData({ firstName: "", lastName: "", email: "", phoneNo: "", message: "" });
    } catch (error) {
      setStatus("Error sending message ❌");
    }
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center mt-12">
      <h1 className="text-3xl font-bold">📩 Contact Us</h1>
      <p className="mt-4 text-gray-600 max-w-md">Have questions? Reach out to us.</p>

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-lg p-6 bg-gray-100 rounded-lg shadow-md">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full p-3 border rounded-lg mb-2" required />
        {errors.firstName && <p className="text-red-500 text-sm mb-4">{errors.firstName}</p>}

        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full p-3 border rounded-lg mb-4" />

        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg mb-2" required />
        {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}

        <input type="text" name="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} className="w-full p-3 border rounded-lg mb-2" required />
        {errors.phoneNo && <p className="text-red-500 text-sm mb-4">{errors.phoneNo}</p>}

        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 h-32" required></textarea>
        {errors.message && <p className="text-red-500 text-sm mb-4">{errors.message}</p>}

        <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50" disabled={Object.keys(errors).length > 0}>
          Send Message
        </button>
      </form>

      {status && <p className="mt-4 text-lg">{status}</p>}
    </div>
  );
};

export default ContactForm;
