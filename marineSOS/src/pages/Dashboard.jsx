import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

import { Link, Navigate, useNavigate } from "react-router-dom";

import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
    collection,
    addDoc,
    doc,
    getDoc
} from "firebase/firestore";

function Dashboard() {

    const navigate = useNavigate();
    const user = auth.currentUser;

    const [userData, setUserData] = useState({});

    const [emergencyType, setEmergencyType] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {

        const fetchUser = async () => {

            if (!user) return;

            const docRef = doc(db, "users", user.uid);

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                setUserData(docSnap.data());

            }

        };

        fetchUser();

    }, []);

    if (!user) {
        return <Navigate to="/login" />;
    }

    const handleLogout = async () => {

        try {

            await signOut(auth);

            navigate("/login");

        } catch (error) {

            alert(error.message);

        }

    };

    const getLocation = () => {

        return new Promise((resolve, reject) => {

            navigator.geolocation.getCurrentPosition(resolve, reject);

        });

    };

    const handleSOS = async () => {

        if (emergencyType === "") {

            alert("Please Select Emergency Type");

            return;

        }

        if (description.trim() === "") {

            alert("Please Enter Description");

            return;

        }

        try {

            const position = await getLocation();

            await addDoc(collection(db, "sosRequests"), {

                userId: user.uid,

                name: userData.name,

                email: user.email,

                emergencyType,

                description,

                latitude: position.coords.latitude,

                longitude: position.coords.longitude,

                status: "Pending",

                time: new Date()

            });

            alert("🚨 SOS Sent Successfully!");

            setEmergencyType("");
            setDescription("");

        } catch (error) {

            alert(error.message);

        }

    };

    return (

        <>
            <Navbar />

            <div className="hero">

                <h1>🚢 MarineSOS Dashboard</h1>

                <h2>Welcome, {userData.name} 👋</h2>

                <div className="dashboard-grid">

                    <div className="dashboard-card">

                        <h2>🚨 Send SOS</h2>

                        <p>Select your emergency and describe it.</p>

                        <select
                            value={emergencyType}
                            onChange={(e) => setEmergencyType(e.target.value)}
                        >
                            <option value="">Select Emergency</option>
                            <option value="Boat Capsized">Boat Capsized</option>
                            <option value="Fire">Fire</option>
                            <option value="Medical Emergency">Medical Emergency</option>
                            <option value="Engine Failure">Engine Failure</option>
                            <option value="Person Overboard">Person Overboard</option>
                            <option value="Other">Other</option>
                        </select>

                        <textarea
                            placeholder="Describe the emergency..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button onClick={handleSOS}>
                            🚨 Send SOS
                        </button>

                    </div>

                    <div className="dashboard-card">

                        <h2>👤 My Profile</h2>

                        <p>View and update your personal information.</p>

                        <Link to="/profile">
                            <button>
                                Open Profile
                            </button>
                        </Link>

                    </div>

                    <div className="dashboard-card">

                        <h2>📋 My SOS History</h2>

                        <p>View all your previous SOS requests.</p>

                        <Link to="/history">
                            <button>
                                View History
                            </button>
                        </Link>

                    </div>

                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </>

    );

}

export default Dashboard;