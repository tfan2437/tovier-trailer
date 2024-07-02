// Style and Icons
import "./Navbar.css";
import logo from "../assets/tvoier-purple-logo.png";
import searchIcon from "../assets/icon-search.png";
import notiIcon from "../assets/icon-notification.png";
import caretIcon from "../assets/caret_icon.svg";

// Firebase
import { logout, auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("user");
  const [userImage, setUserImage] = useState("");
  const [userProvider, setUserProvider] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    // Query user information on database
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const q = query(
          collection(db, "users"),
          where("uid", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
          setUsername(doc.data().name);
          setUserImage(doc.data().profileImage);
          setUserProvider(doc.data().authProvider);
          setUserEmail(doc.data().email);
        });
      } else {
        setUser(null);
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
              src={
                userImage ||
                "https://live.staticflickr.com/65535/53818372241_08c548fb4b_s.jpg"
              }
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
                {username || "User"}
              </p>
              <p style={{ color: "#888888" }}>
                {userEmail || "user@gmail.com"}
              </p>
              <p style={{ color: "#888888" }}>
                Provider: {userProvider || "unknown"}
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
