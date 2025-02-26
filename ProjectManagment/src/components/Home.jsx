// components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import projectImage from "../../public/Imgs/aerial-view-business-data-analysis-graph_53876-146152.avif"; // Importera bilden
import "../Styles/global.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>
        Välkommen till <span className="h1-Home">Mattin-Lassei Group AB</span>
      </h1>
      <p>Här kan du skapa, redigera och hantera dina projekt.</p>
      <img src={projectImage} alt="Projekthanteraren" className="home-image" />
      <button onClick={() => navigate("/ProjectList")}>
        Visa alla projekt
      </button>
      <button onClick={() => navigate("/create")}>Skapa nytt projekt</button>
    </div>
  );
};

export default Home;
