import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, updateProject } from "../services/projectService";
import { getStatuses } from "../services/StatusService";
import { getServices } from "../services/ServiceService";
import "../Styles/global.css";
import {
  validateProjectName,
  validateTotalPrice,
} from "../Validation/Validation"; // Importera valideringsfunktioner

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
  const [statuses, setStatuses] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({}); // State för valideringsfel
  const navigate = useNavigate();

  useEffect(() => {
    fetchProject();
    fetchStatusesAndServices();
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

  const fetchStatusesAndServices = async () => {
    try {
      const statusesData = await getStatuses();
      const servicesData = await getServices();
      setStatuses(statusesData);
      setServices(servicesData);
    } catch (error) {
      console.error("Error fetching statuses or services:", error);
      setError("Kunde inte hämta statusar eller tjänster.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });

    // Validera fältet när värdet ändras
    if (name === "name") {
      setValidationErrors({
        ...validationErrors,
        name: validateProjectName(value),
      });
    } else if (name === "totalPrice") {
      setValidationErrors({
        ...validationErrors,
        totalPrice: validateTotalPrice(value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kör validering innan formuläret skickas
    const nameError = validateProjectName(project.name);
    const priceError = validateTotalPrice(project.totalPrice);

    if (nameError || priceError) {
      setValidationErrors({
        name: nameError,
        totalPrice: priceError,
      });
      return; // Avbryt om valideringsfel finns
    }

    try {
      await updateProject(projectNumber, project);
      navigate(`/projects/${projectNumber}`);
    } catch (error) {
      setError("Misslyckades med att uppdatera projektet");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
          {validationErrors.name && (
            <p style={{ color: "red" }}>{validationErrors.name}</p>
          )}
        </label>
        <label>
          Beskrivning:
          <input
            type="text"
            name="description"
            value={project.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Totalpris:
          <input
            type="number"
            name="totalPrice"
            value={project.totalPrice}
            onChange={handleChange}
            required
          />
          {validationErrors.totalPrice && (
            <p style={{ color: "red" }}>{validationErrors.totalPrice}</p>
          )}
        </label>
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
        <label>
          Status:
          <select
            name="statusId"
            value={project.statusId}
            onChange={handleChange}
            required
          >
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tjänst:
          <select
            name="serviceId"
            value={project.serviceId}
            onChange={handleChange}
            required
          >
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Spara ändringar</button>
      </form>
    </div>
  );
};

export default EditProject;
