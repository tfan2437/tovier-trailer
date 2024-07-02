import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
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
          404 Not Found
        </h1>
        <LoadingAnimation height={"100vh"} />
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
