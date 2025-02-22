import React, { useState, useEffect } from "react";
import { getProjects } from "../services/projectService";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      console.log("✅ Hämtade projekt:", data);
      if (data.length === 0) {
        console.warn("⚠️ Inga projekt hittades!");
      }
      setProjects(data);
    } catch (error) {
      console.error("❌ Fel vid hämtning av projekt:", error);
    }
  };

  return (
    <div>
      <h2>📋 Projektlista</h2>
      {projects.length === 0 ? (
        <p>🚀 Inga projekt hittades! Lägg till ett nytt projekt.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.projectNumber}>
              <Link to={`/projects/${project.projectNumber}`}>
                {project.name} - {project.status}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;
