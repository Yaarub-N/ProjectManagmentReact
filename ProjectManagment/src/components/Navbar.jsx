import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import "../Styles/global.css";

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation(); // Hämta aktuell route

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  // Stäng menyn när routen ändras
  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <header className={`header ${darkMode ? "dark-mode" : "light-mode"}`}>
      <nav>
        <div className="nav-box">
          <h3 className="logo"> Mattin-Lassei Group AB</h3>
          <div className="menu-toggle" onClick={toggleMenu}>
            ☰
          </div>
        </div>
        <ul className={`ulMenu ${menuActive ? "active" : ""}`}>
          <li>
            <Link to="/create" onClick={closeMenu}>
              ➕ Skapa Projekt
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={closeMenu}>
              📂 Projekt lista
            </Link>
          </li>
          <li>
            <Link to="/" onClick={closeMenu}>
              About us
            </Link>
          </li>
          <li>
            <Link to="/create" onClick={closeMenu}>
              ➕ Skapa Projekt
            </Link>
          </li>
        </ul>
        <Link className="toggel-button-box" onClick={closeMenu}>
          <button
            className="toggel-button"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
