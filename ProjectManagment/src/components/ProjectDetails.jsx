import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, deleteProject } from "../services/projectService";
import "../Styles/global.css";

const ProjectDetails = () => {
  const { projectNumber } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const data = await getProjectById(projectNumber);
      setProject(data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Är du säker på att du vill ta bort detta projekt?")) {
      await deleteProject(projectNumber);
      navigate("/");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("sv-SE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  if (!project) return <p>Laddar...</p>;

  return (
    <div className="project-details">
      <h2>{project.name}</h2>
      <div className="project-info">
        <div className="info-item">
          <span className="info-label">Description:</span>
          <span className="info-value"> {project.description}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Status:</span>
          <span className="info-value">{project.status}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Tidsperiod:</span>
          <span className="info-value">
            {formatDate(project.startDate)} - {formatDate(project.endDate)}
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Tjänst:</span>
          <span className="info-value">
            {project.serviceName || "Ingen tjänst"}
          </span>
        </div>
      </div>
      <div className="button-group">
        <button onClick={handleDelete} className="delete-btn">
          Ta bort
        </button>
        <button
          onClick={() => navigate(`/edit/${project.projectNumber}`)}
          className="edit-btn"
        >
          Redigera
        </button>
        <button onClick={() => navigate("/ProjectList")} className="back-btn">
          Tillbaka till projektlista
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
