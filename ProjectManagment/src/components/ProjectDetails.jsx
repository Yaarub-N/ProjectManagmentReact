import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, deleteProject } from "../services/projectService";
import "../styles/global.css";

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

  if (!project) return <p>Laddar...</p>;

  return (
    <div className="project-details">
      <h2>{project.name}</h2>
      <p>Status: {project.status}</p>
      <p>
        Tidsperiod: {project.startDate} - {project.endDate}
      </p>
      <button onClick={handleDelete} className="delete-btn">
        ❌ Ta bort
      </button>
      <button
        onClick={() => navigate(`/edit/${project.projectNumber}`)}
        className="edit-btn"
      >
        ✏️ Redigera
      </button>
    </div>
  );
};

export default ProjectDetails;
