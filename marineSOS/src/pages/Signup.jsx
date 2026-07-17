import { Link } from "react-router-dom";
import "./Login.css";


import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const handleSignup = async () => {
    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await setDoc(doc(db, "users", userCredential.user.uid), {
    name: name,
    email: email,
    phone: "",
    bloodGroup: "",
    emergencyContact: ""
});
        alert("Account Created Successfully!");
        navigate("/dashboard");

    } catch (error) {
        alert(error.message);
    }
};

    return (
        <div className="login-container">

            <h1>Signup</h1>
            <input
    type="text"
    placeholder="Full Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
/>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleSignup}>
                Create Account
            </button>

            <p>
                Already have an account?
                <Link to="/login"> Login</Link>
            </p>

        </div>
    );
}

export default Signup;