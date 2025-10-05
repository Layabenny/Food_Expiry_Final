import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials! Use admin/admin123");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route path="*" element={<Dashboard onLogout={handleLogout} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
