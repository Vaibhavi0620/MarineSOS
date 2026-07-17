import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./Profile.css";

function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    emergencyContact: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;

      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setUserData({
            name: data.name || "",
            email: data.email || user.email,
            phone: data.phone || "",
            bloodGroup: data.bloodGroup || "",
            emergencyContact: data.emergencyContact || ""
          });
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const saveProfile = async () => {
    try {
      const user = auth.currentUser;

      await updateDoc(doc(db, "users", user.uid), {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        bloodGroup: userData.bloodGroup,
        emergencyContact: userData.emergencyContact
      });

      alert("✅ Profile Updated Successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="hero">
        <h1>👤 My Profile</h1>

        <div className="profile-card">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            value={userData.email}
            disabled
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={userData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group"
            value={userData.bloodGroup}
            onChange={handleChange}
          />

          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact"
            value={userData.emergencyContact}
            onChange={handleChange}
          />

          <button onClick={saveProfile}>
            Save Changes
          </button>

        </div>
      </div>
    </>
  );
}

export default Profile;