// import { Link } from "react-router-dom";
import "./Login.css";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
        navigate("/dashboard");
    } catch (error) {
        alert(error.message);
    }
};
  return (
    <div className="login-container">
      <h1>Login</h1>
    <input
    type="email"
    placeholder="Enter Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
/>
<input
    type="password"
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
/>
      <button onClick={handleLogin}>
    Login
</button>
      <p>
        Don't have an account?{" "}
        <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;