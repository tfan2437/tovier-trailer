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

const Navbar = () => {
  const navRef = useRef();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("user");
  const [profileImage, setProfileImage] = useState("");
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
          setName(doc.data().name);
          setProfileImage(doc.data().profileImage);
        });
      } else {
        setUser(null);
      }
    });

    // Navbar black background >= 400 in Y
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 400) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
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
            placeholder="Search"
            className={`search-bar-input ${showSearch ? "" : "hidden"}`}
          />
        </div>
        <img src={notiIcon} alt="" className="icons" />
        <p>{name || "Member"}</p>
        <div className="navbar-profile">
          <img
            src={
              profileImage ||
              "https://live.staticflickr.com/65535/53818372241_08c548fb4b_s.jpg"
            }
            alt="user profile image"
            className="profile"
          />
          <img src={caretIcon} alt="" />
          <div className="dropdown">
            <p onClick={() => logout()}>Sign Out of Neoflick</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
