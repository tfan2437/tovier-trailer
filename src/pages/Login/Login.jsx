import "./Login.css";
import neoflickLogo from "../../assets/neoflick-logo.png";
import googleG from "../../assets/google-g.png";
import spinner from "../../assets/netflix_spinner.gif";
import { useState } from "react";

// Firebase
import { signup, login, loginWithGoogle } from "../../firebase";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
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
    <div className="login-spinner">
      <img src={spinner} alt="loading spinner" />
    </div>
  ) : (
    <div className="login">
      <img src={neoflickLogo} alt="" className="login-logo" />
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
              New to Neoflick?{" "}
              <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
