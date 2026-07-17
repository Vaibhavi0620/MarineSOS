import { Routes,Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SOSHistory from "./pages/SOSHistory";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
function App(){
  return(
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/dashboard" element={<Dashboard />}/>
    <Route path="/profile" element={<Profile />}/>
    <Route path="/history" element={<SOSHistory />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
  );
}
export default App;