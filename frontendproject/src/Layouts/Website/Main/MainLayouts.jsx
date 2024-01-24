import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./pages/Home/components/header/Header";
import Navbar from "./pages/Home/components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import "./MainLayouts.css"; // Assuming you have a separate CSS file for styles
import { userContext } from "../../../context/AuthContext";
import { ProfileCall } from "../../../Services/Auth";

export default function MainLayouts() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`headerLayout ${scrollPosition > 150 ? 'hidden' : ''}`}>
        <Header />
      </div>
      <div className={`navbarLayout ${scrollPosition > 150 ? 'fixed' : ''}`}>
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
