import "./Navbar.css";
import logo from "../../assets/neoflick-logo.png";
import searchIcon from "../../assets/search_icon.svg";
import bellIcon from "../../assets/bell_icon.svg";
import caretIcon from "../../assets/caret_icon.svg";
import { useEffect, useRef, useState } from "react";
import { logout, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const navRef = useRef();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY >= 500) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
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
        <img src={searchIcon} alt="" className="icons" />
        <p>Children</p>
        <img src={bellIcon} alt="" className="icons" />
        <div className="navbar-profile">
          <img
            src={
              currentUser?.photoURL ||
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
