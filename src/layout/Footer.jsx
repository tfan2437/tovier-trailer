import "./Footer.css";
import linkedInIcon from "../assets/icon-social-media-linkedin.png";
import xIcon from "../assets/icon-social-media-x.png";
import instagramIcon from "../assets/icon-social-media-instagram.png";
import facebookIcon from "../assets/icon-social-media-facebook.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-column-container">
        <div className="footer-column hidden-column">
          <NavLink to={"/"} className="footer-navlink">
            <span>Movie</span>
          </NavLink>
          <NavLink to={"/"} className="footer-navlink">
            Genres
          </NavLink>
          <NavLink to={"/"} className="footer-navlink">
            Trending
          </NavLink>
          <NavLink to={"/"} className="footer-navlink">
            New Releases
          </NavLink>
          <NavLink to={"/"} className="footer-navlink">
            Popular
          </NavLink>
        </div>
        <div className="footer-column hidden-column">
          <NavLink to={"/"} className="footer-navlink">
            <span>Shows</span>
          </NavLink>
          <NavLink to={"/"} className="footer-navlink">
            Genres
          </NavLink>
          <NavLink to={"/"} className="footer-navlink">
            Trending
          </NavLink>
          <NavLink to={"/"} className="footer-navlink">
            New Releases
          </NavLink>
          <NavLink to={"/"} className="footer-navlink">
            Popular
          </NavLink>
        </div>
        <div className="footer-column hidden-column">
          <NavLink to={"/"} className="footer-navlink">
            <span>Support</span>
          </NavLink>
          <NavLink to={"/"} className="footer-navlink">
            Help Center
          </NavLink>
          <NavLink to={"/"} className="footer-navlink">
            FAQ
          </NavLink>
          <NavLink to={"/"} className="footer-navlink">
            Contact Us
          </NavLink>
        </div>
        <div className="footer-column">
          <NavLink to={"/"} className="footer-navlink">
            <span>Company</span>
          </NavLink>
          <NavLink to={"/"} className="footer-navlink">
            About Us
          </NavLink>
          <NavLink to={"/"} className="footer-navlink">
            Careers
          </NavLink>
          <NavLink to={"/"} className="footer-navlink">
            Legal Notice
          </NavLink>
        </div>
        <div className="footer-column">
          <NavLink to={"/"} className="footer-navlink">
            <span>Connect With Us</span>
          </NavLink>
          <div className="social-media-link">
            <a href="https://www.facebook.com/" target="_blank">
              <img src={facebookIcon} alt="" />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <img src={instagramIcon} alt="" />
            </a>
            <a href="https://x.com/" target="_blank">
              <img src={xIcon} alt="" />
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <img src={linkedInIcon} alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="copyright-and-policy">
        <p className="copyright-text">&copy; 2024 TOVIER</p>
        <div className="policy-container">
          <NavLink to={"/"} className="policy-navlink">
            <p>Terms of Use</p>
          </NavLink>
          <NavLink to={"/"} className="policy-navlink hidden-policy">
            Privacy Policy
          </NavLink>
          <NavLink to={"/"} className="policy-navlink hidden-policy">
            Cookie Policy
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Footer;
