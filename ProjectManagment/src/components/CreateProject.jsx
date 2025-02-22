import React, { useState } from "react";
import { createProject } from "../services/projectService";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: "",
    description: "",
    totalPrice: 0,
    statusId: 1, // Default status "Not Started"
    customerId: 1, // Placeholder, ändra vid behov
    serviceId: 1, // Placeholder, ändra vid behov
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(project);
      navigate("/"); // Navigera tillbaka till projektlistan
    } catch (error) {
      setError("❌ Misslyckades med att skapa projekt.");
      console.error("API error:", error);
    }
  };

  return (
    <div>
      <h2>➕ Skapa nytt projekt</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
            required
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
        <button type="submit">📌 Skapa Projekt</button>
      </form>
    </div>
  );
};

export default CreateProject;
