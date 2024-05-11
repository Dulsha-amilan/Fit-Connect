import { Link, useNavigate } from "react-router-dom"; // Changed to useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from "./../../assets/logo.png";
import axios from "axios";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate(); // Using useNavigate hook to get navigation function

  const handleLogin = async () => {
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
        // Validation: Check if username and password are not empty
    if (!userName.trim() || !password.trim()) {
      toast.error("Both username and password are required."); // You can replace this with a more user-friendly notification
      return; // Stop the function execution if validation fails
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/verify/${userName}/${password}`
      );
      if (response.data) {
        navigate(`/home/${userName}`); // Navigating to home page using navigate function
      }else {
        // Handle login failure (e.g., invalid credentials)
        toast.error("Invalid username or password."); // Again, consider using a more user-friendly notification method
      }

    } catch (error) {
      console.error("Error fetching profile photo:", error);
    }
  };

  return (
    <div className="login">
      <ToastContainer position="top-right" autoClose={1300} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="card">
        <div className="left">
          <h1>Transform Your Body</h1>
          <p>
          Welcome to our fitness community! Embark on your wellness journey with us today. Let's achieve your fitness goals together.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <div className="logo">
            <img src={Logo} width={"300px"} alt="logo"></img>
            
          </div>
          <h1>Login</h1>
          <form>
            <input id="userName" type="text" placeholder="Username" required/>
            <input id="password" type="password" placeholder="Password" required/>
            <button type="button" onClick={handleLogin}>Login</button> {/* Setting type to button */}
          </form>
        </div>
      </div>
    </div>
  );
};
//
export default Login;
