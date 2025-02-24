import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, updateProject } from "../services/projectService";
import "../Styles/global.css";

const EditProject = () => {
  const { projectNumber } = useParams();
  const [project, setProject] = useState({
    name: "",
    description: "",
    totalPrice: 0,
    statusId: 1,
    customerId: 1,
    serviceId: 1,
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const data = await getProjectById(projectNumber);
      setProject({
        name: data.name,
        description: data.description,
        totalPrice: data.totalPrice,
        statusId: data.statusId || 1,
        customerId: data.customerId || 1,
        serviceId: data.serviceId || 1,
        startDate: data.startDate.split("T")[0],
        endDate: data.endDate.split("T")[0],
      });
    } catch (error) {
      setError("Error fetching project details");
    }
  };

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProject(projectNumber, project);
      navigate(`/projects/${projectNumber}`);
    } catch (error) {
      setError("Misslyckades med att uppdatera projektet");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="edit-project">
      <h2>Redigera Projekt: {project.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Namn:
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Beskrivning:
          <input
            type="text"
            name="description"
            value={project.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Totalpris:
          <input
            type="number"
            name="totalPrice"
            value={project.totalPrice}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Startdatum:
          <input
            type="date"
            name="startDate"
            value={project.startDate}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Slutdatum:
          <input
            type="date"
            name="endDate"
            value={project.endDate}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Spara ändringar</button>
      </form>
    </div>
  );
};

export default EditProject;
