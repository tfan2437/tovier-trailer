import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default App;
