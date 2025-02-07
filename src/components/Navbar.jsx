import Navbar from "./components/Navbar";

function App() {
    return (
        <div>
            <Navbar />
            <section id="hero-section" className="h-screen bg-blue-200 flex justify-center items-center">
                <h2 className="text-4xl">Home Section</h2>
            </section>
            <section id="about-section" className="h-screen bg-green-200 flex justify-center items-center">
                <h2 className="text-4xl">About Us</h2>
            </section>
            <section id="services-section" className="h-screen bg-red-200 flex justify-center items-center">
                <h2 className="text-4xl">Services</h2>
            </section>
            <section id="contact-section" className="h-screen bg-yellow-200 flex justify-center items-center">
                <h2 className="text-4xl">Contact</h2>
            </section>
        </div>
    );
}

export default App;
