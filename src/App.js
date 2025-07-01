import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Components/Views/Landing";
import Login from "./Components/Views/Login";
import Home from "./Components/Views/Home";
import Register from "./Components/Views/Register";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
