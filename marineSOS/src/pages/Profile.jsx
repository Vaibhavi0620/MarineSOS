import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Profile.css";

import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Profile() {

    const user = auth.currentUser;

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [emergencyContact, setEmergencyContact] = useState("");

    useEffect(() => {

        const fetchProfile = async () => {

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                const data = docSnap.data();

                setName(data.name || "");
                setPhone(data.phone || "");
                setBloodGroup(data.bloodGroup || "");
                setEmergencyContact(data.emergencyContact || "");

            }

        };

        fetchProfile();

    }, []);

    const handleSave = async () => {

        try {

            await updateDoc(doc(db, "users", user.uid), {

                name,
                phone,
                bloodGroup,
                emergencyContact

            });

            alert("Profile Updated Successfully!");

        } catch (error) {

            alert(error.message);

        }

    };

    return (

        <>
            <Navbar />

            <div className="profile-container">

                <h1>👤 My Profile</h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    value={user.email}
                    disabled
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Blood Group"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Emergency Contact"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                />

                <button onClick={handleSave}>
                    Save Changes
                </button>

            </div>

        </>

    );

}

export default Profile;