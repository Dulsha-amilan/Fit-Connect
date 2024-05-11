import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"; 
import "./register.scss";

const Register = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
  });

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate(); // Initialize useNavigate
  const handleRegister = async (e) => {
    e.preventDefault();

  // Check if all fields are filled
  if (!formData.username || !formData.password || !profilePicture) {
    // alert("Please fill in all fields.");
    toast.error("Please fill in all fields.");
    
    return; // Stop the function if any field is empty
  }

  // Check if the password is at least 5 characters long
  if (formData.password.length < 5) {
    toast.error("Password must be at least 5 characters long.");
    return; // Stop the function if the password is too short
  }



    try {
      const userData = new FormData();
      userData.append("profilePicture", profilePicture);
      userData.append("userName", formData.username);
      userData.append("password", formData.password);

      const response = await axios.post("http://localhost:8080/create", userData);
      console.log("Registration successful:", response.data);
      var successfull = document.getElementById("successfull");
      successfull.value = "Registration successfull"
      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate('/'); // Navigate to the login page after a delay
      }, 1400); // 2000 milliseconds = 2 seconds delay
    } catch (error) {
      toast.error("Registration failed.");
    }
  };

  return (
    <div className="register">
      <ToastContainer position="top-right" autoClose={1300} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="card">
        <div className="left">
          <h1>Join Now</h1>
          <p>Join our community and Unleash Your Potential. Connect. Inspire. Achieve. Your ultimate fitness companion for reaching new heights!</p>
          <span id="successfull"></span>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <div className="profile-picture">
              <label htmlFor="profilePictureInput">
                Choose Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  id="profilePictureInput"
                  onChange={handleProfilePictureChange}
                />
              </label>
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
