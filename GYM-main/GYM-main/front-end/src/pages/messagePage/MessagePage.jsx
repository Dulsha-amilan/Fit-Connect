import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Messages from "../../components/message/Message";
import LeftBar from "../../components/leftBar/LeftBar";
import RightBar from "../../components/rightBar/RightBar";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import "./MessagePage.scss";

function MessagePage() {
  const { userName } = useParams();
  const { darkMode } = useContext(DarkModeContext);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/profile-photo/${userName}`
        );
        setProfilePic(response.data);
      } catch (error) {
        console.error("Error fetching profile photo:", error);
      }
    };

    fetchProfilePhoto();
  }, [userName]);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar userName={userName} profilePic={profilePic} />
        <LeftBar userName={userName} profilePic={profilePic} />
        <div style={{ display: "flex" }}>
        
          <div style={{ flex: 6 }}>
            <div className="home">
              <Messages userName={userName} profile={profilePic}/>
            </div>
          </div>
          <RightBar userName={userName} profilePic={profilePic}/>
        </div>
      </div>
    );
  };

  return <Layout />;
}

export default MessagePage;
