import React, { useContext, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../../../../../../context/AuthContext";

export default function Header() {
  const { user } = useContext(userContext);
  const [userOpen, setUserOpen] = useState(false);
  const userLogin = () => {
    setUserOpen(!userOpen);
  };
  const navigate=useNavigate()
  const handleSiteLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/")
    }, 1000);
  };

  return (
    <header className="header">
      <div className="headerContainer">
        <div className="headerLeft">
          <div className="headerLeftInfo">
            <div className="phone">
              <i className="fa-solid fa-phone"></i>
              <span>123 456 789</span>
            </div>
            <div className="email">
              <i className="fa-solid fa-envelope"></i>
              <span>azerfeteliyev5@gmail.com</span>
            </div>
          </div>
          <div className="socialLinks">
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-solid fa-rss"></i>
            <i className="fa-brands fa-google"></i>
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-instagram"></i>
          </div>
        </div>
        <div className="headerRight">
          <div className="setting">
            <i className="fa-solid fa-user" style={{cursor:"pointer"}} onClick={userLogin}></i>
            <div className={`userDropDown ${userOpen ? "closeUser" : ""} `}>
              {user ? <p onClick={handleSiteLogout}>Log Out</p> : null}
              {user ? <p>{user.email}</p> : null}
              {!user ? (
                <Link to={"/sitelogin"} style={{ color: "black" }}>
                  Log In
                </Link>
              ) : null}
              {!user ? (
                <Link to={"/siteregister"} style={{ color: "black" }}>
                  Register
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
