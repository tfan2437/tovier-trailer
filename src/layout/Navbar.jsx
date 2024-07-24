// Style and Icons
import "./Navbar.css";
import logo from "../assets/tvoier-purple-logo.png";
import searchIcon from "../assets/icon-search.png";
import notiIcon from "../assets/icon-notification.png";
import caretIcon from "../assets/caret_icon.svg";

// Firebase
import { logout, auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const [showSearch, setShowSearch] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        setCurrentUser(userData);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRedirect = (e) => {
    if (e.key === "Enter") {
      const searchKeyword = e.target.value.replace(/ /g, "%20");
      navigate(`/searchresults/${searchKeyword}`);
    }
  };

  const scrollToSection = (id) => {
    navigate(`/`);
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="navbar-container">
      <div ref={navRef} className="navbar">
        <div className="navbar-left">
          <NavLink to={"/"}>
            <img src={logo} alt="logo" className="logo" />
          </NavLink>
          {location.pathname === "/" && (
            <ul>
              <li onClick={() => scrollToSection("home")}>Home</li>
              <li onClick={() => scrollToSection("movies")}>Movies</li>
              <li onClick={() => scrollToSection("movies")}>Now Playing</li>
              <li onClick={() => scrollToSection("now-playing")}>Classic</li>
              <li onClick={() => scrollToSection("classic")}>Series</li>
              <li onClick={() => scrollToSection("tv-Series")}>Trending</li>
            </ul>
          )}
        </div>
        <div className="navbar-right">
          <div className="search-bar">
            <img
              src={searchIcon}
              alt="search icon"
              className="icons"
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            />
            <input
              type="text"
              placeholder="Search"
              className={`search-bar-input ${showSearch ? "" : "hidden"}`}
              onKeyPress={(e) => handleRedirect(e)}
            />
          </div>
          <div className="notification" style={{ marginRight: "10px" }}>
            <img
              src={notiIcon}
              alt="notification icon"
              className="icons"
              style={{ padding: "4px 0 0 0" }}
            />
            <p className="notification-message">No message</p>
          </div>
          <div className="navbar-profile">
            <img
              src={currentUser?.profileImage || assets.blackImage}
              alt="user profile"
              className="profile"
            />
            <img src={caretIcon} alt="caret icon" />
            <div className="dropdown">
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#888888",
                }}
              >
                {currentUser?.name || "User"}
              </p>
              <p style={{ color: "#888888" }}>
                {currentUser?.email || "user@gmail.com"}
              </p>
              <p style={{ color: "#888888" }}>
                {currentUser?.authProvider || "Tovier"}
              </p>
              <p
                onClick={() => logout()}
                style={{
                  marginBottom: "0",
                  fontSize: "15px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Sign Out
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
