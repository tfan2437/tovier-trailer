import "./Login.css";
import googleG from "../../assets/google-g.png";
import { useState, useEffect } from "react";
import logo from "../../assets/tvoier-purple-logo.png";

// Firebase
import { auth, signUp, login, loginWithGoogle } from "../../firebase";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const [signState, setSignState] = useState("Sign In");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        navigate("/");
      }
    });
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signUp(name, email, password);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    await loginWithGoogle();

    setLoading(false);
  };

  return loading ? (
    <div
      style={{
        position: "relative",
      }}
    >
      <h1
        style={{
          opacity: "0.3",
          position: "absolute",
          fontFamily: "Druk-Wide-Bold",
          left: "50vw",
          top: "50vh",
          transform: "translate(-50%, -50%)",
          zIndex: 20,
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        TOVIER
      </h1>
      <LoadingAnimation height={"100vh"} />
    </div>
  ) : (
    <div className="login">
      <img src={logo} alt="" className="login-logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" ? (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : null}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="signin-btn" onClick={handleAuth}>
            {signState}
          </button>
          <div className="or">
            <p>OR</p>
          </div>

          <button className="google-btn" onClick={handleGoogleSignIn}>
            <img src={googleG} alt="" />
            Sign in with Google
          </button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
            </p>
          ) : (
            <p>
              New to Tovier?{" "}
              <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
