import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <>
            <Navbar />

            <div className="hero">

                <h1>🚢 MarineSOS</h1>

                <p className="tagline">
                    Smart Maritime Emergency Response System
                </p>

                <Link to="/login">
                    <button className="hero-btn">
                        Get Started
                    </button>
                </Link>

            </div>

            <section className="features">

                <h2>Our Features</h2>

                <div className="feature-grid">

                    <div className="feature-card">
                        <h3>🚨 Send SOS</h3>
                        <p>Instantly send emergency requests with live GPS location.</p>
                    </div>

                    <div className="feature-card">
                        <h3>📍 Live Location</h3>
                        <p>Automatically captures your location during emergencies.</p>
                    </div>

                    <div className="feature-card">
                        <h3>📋 SOS History</h3>
                        <p>Track all your previous emergency requests.</p>
                    </div>

                    <div className="feature-card">
                        <h3>👤 Secure Account</h3>
                        <p>Firebase Authentication keeps your account protected.</p>
                    </div>

                </div>

            </section>

            <section className="about">

                <h2>About MarineSOS</h2>

                <p>
                    MarineSOS is a web application developed using React and
                    Firebase that enables users to send emergency SOS alerts,
                    share their live location, maintain their emergency profile,
                    and view their SOS history.
                </p>

            </section>

            <footer>

                © 2026 MarineSOS | Built using React & Firebase

            </footer>

        </>
    );
}

export default Home;