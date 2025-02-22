import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, updateProject } from "../services/projectService";
import "../styles/global.css";

const EditProject = () => {
  const { projectNumber } = useParams(); // Hämta projectNumber från URL:en
  const [project, setProject] = useState({
    name: "",
    description: "",
    totalPrice: 0,
    statusId: 1, // Standardvärde
    customerId: 1, // Standardvärde
    serviceId: 1, // Standardvärde
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
      console.log("Fetched project data:", data); // Logga datan
      if (data) {
        setProject({
          name: data.name,
          description: data.description,
          totalPrice: data.totalPrice,
          statusId: data.statusId || 1, // Ange standardvärde om undefined
          customerId: data.customerId || 1, // Ange standardvärde om undefined
          serviceId: data.serviceId || 1, // Ange standardvärde om undefined
          startDate: data.startDate.split("T")[0], // Format to yyyy-MM-dd
          endDate: data.endDate.split("T")[0], // Format to yyyy-MM-dd
        });
      }
    } catch (error) {
      setError("Error fetching project details");
    }
  };

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validera ID:n
    if (!project.statusId || !project.customerId || !project.serviceId) {
      setError("Ogiltigt status-, kund- eller tjänst-ID.");
      return;
    }

    const formattedProject = {
      ...project,
      startDate: project.startDate,
      endDate: project.endDate,
    };

    console.log("Submitting project:", formattedProject); // Logga värdena

    try {
      await updateProject(projectNumber, formattedProject);
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
        {/* Lägg till dropdowns för status, kund och tjänst om det behövs */}
        <button type="submit">Spara ändringar</button>
      </form>
    </div>
  );
};

export default EditProject;
