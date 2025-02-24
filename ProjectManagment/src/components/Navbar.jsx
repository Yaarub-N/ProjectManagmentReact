import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider"; // Importera Theme Hook

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <nav className={`navbar ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Link to="/">📂 Project Management</Link>
      <Link to="/">📂 Projektlista</Link>
      <Link to="/create">➕ Skapa Projekt</Link>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
