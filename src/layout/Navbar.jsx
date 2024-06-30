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
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();

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

    // Navbar black background >= 450 in Y
    // window.addEventListener("scroll", () => {
    //   if (window.scrollY >= 450) {
    //     navRef.current.classList.add("navbar-over-y450");
    //   } else {
    //     navRef.current.classList.remove("navbar-over-y450");
    //   }
    // });

    return () => unsubscribe();
  }, []);

  const handleRedirect = (e) => {
    if (e.key === "Enter") {
      const searchKeyword = e.target.value.replace(/ /g, "%20");
      navigate(`/searchresults/${searchKeyword}`);
    }
  };

  return (
    <div className="navbar-container">
      <div ref={navRef} className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="" className="logo" />
          <ul>
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li>My List</li>
            <li>Browse by Languages</li>
          </ul>
        </div>
        <div className="navbar-right">
          <div className="search-bar">
            <img
              src={searchIcon}
              alt=""
              className="icons"
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            />
            <input
              type="text"
              placeholder="Search: In Development"
              className={`search-bar-input ${showSearch ? "" : "hidden"}`}
              onKeyPress={(e) => handleRedirect(e)}
            />
          </div>
          <div className="notification" style={{ marginRight: "10px" }}>
            <img
              src={notiIcon}
              alt=""
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
              alt="user profile image"
              className="profile"
            />
            <img src={caretIcon} alt="" />
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
                Provider: {userProvider || "unknow"}
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
