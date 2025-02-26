import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import "../Styles/global.css";

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <header className={`header ${darkMode ? "dark-mode" : "light-mode"}`}>
      <nav>
        <div className="nav-box">
          <div className="menu-toggle" onClick={toggleMenu}>
            ☰
          </div>

          <h3 className="logo">
            {" "}
            <Link to="/">Mattin-Lassei Group AB</Link>
          </h3>

          <ul className={`ulMenu ${menuActive ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={closeMenu}>
                Start Sida
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={closeMenu}>
                Skapa Projekt
              </Link>
            </li>
            <li>
              <Link to="/projectList" onClick={closeMenu}>
                Projektlista
              </Link>
            </li>
            <li>
              <Link to="/" onClick={closeMenu}>
                Om oss
              </Link>
            </li>
          </ul>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
