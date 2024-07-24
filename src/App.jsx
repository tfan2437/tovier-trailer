import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayerTV from "./pages/Player/PlayerTV";
import SearchResults from "./pages/SearchResults/SearchResults";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/searchresults/:id" element={<SearchResults />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/playertv/:id" element={<PlayerTV />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
