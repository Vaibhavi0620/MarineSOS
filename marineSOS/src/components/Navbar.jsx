import "./Navbar.css";
import {Link , useNavigate} from "react-router-dom";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";
function Navbar(){
    const navigate = useNavigate();
    const user = auth.currentUser;
    const  handleLogout=async () =>{
        try {
            await signOut(auth);
            alert("Logged Out Successfully!");
            navigate("/login");
        }catch(error){
            alert(error.message);
        }
    }

    return(
       <nav>
    <h2 className="logo">🚢 MarineSOS</h2>

    <div className="nav-links">
        <Link to="/">Home</Link>

        {user ? (
            <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/history">SOS History</Link>
                {/* <Link to="/admin">Admin</Link> */}
                {/* <button onClick={handleLogout}>
                Logout
                </button> */}
            </>
        ) : (
            <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </>
        )}
    </div>
</nav>
    );
}
export default Navbar;