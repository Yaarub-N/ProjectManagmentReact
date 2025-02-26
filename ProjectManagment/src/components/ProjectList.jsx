import React, { useState, useEffect } from "react";
import { getProjects } from "../services/projectService";
import { Link } from "react-router-dom";
import "../Styles/global.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <div className="container">
      <h2>Projektlista</h2>
      {projects.length === 0 ? (
        <p>Inga projekt hittades! Lägg till ett nytt projekt.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Namn</th>
              <th>Status</th>

              <th className="d-non-small-device">Tjänst</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.projectNumber}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/projects/${project.projectNumber}`}>
                    {project.name}
                  </Link>
                </td>
                <td>
                  <Link to={`/projects/${project.projectNumber}`}>
                    {project.status}
                  </Link>
                </td>

                <td className="d-non-small-device">
                  <Link to={`/projects/${project.projectNumber}`}>
                    {project.serviceName}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProjectList;
