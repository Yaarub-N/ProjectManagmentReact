import React, { useState, useEffect } from "react";
import { getServices } from "../services/ServiceService";
import { createProject } from "../services/projectService";
import { getStatuses } from "../services/StatusService";
import { useNavigate } from "react-router-dom";
import "../Styles/global.css";
import {
  validateProjectName,
  validateTotalPrice,
} from "../Validation/Validation"; // Importera valideringsfunktioner

const CreateProject = () => {
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({}); // State för valideringsfel

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const statusesData = await getStatuses();
        const servicesData = await getServices();
        setStatuses(statusesData);
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Kunde inte hämta data. Försök igen senare.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

    setLoading(true);
    try {
      await createProject(project);
      navigate("/ProjectList");
    } catch (error) {
      console.error("API error:", error);
      setError("Misslyckades med att skapa projekt.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Laddar...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="create-project">
      <h2>Skapa nytt projekt</h2>
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
            required
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
        <button type="submit" disabled={loading}>
          {loading ? "Skapar..." : "Skapa Projekt"}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
