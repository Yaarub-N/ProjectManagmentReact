import axios from "axios";

const API_URL = "https://localhost:7007/api/projects"; // Uppdatera med din API-URL

export const getProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ API error - getProjects:", error);
    return [];
  }
};

export const getProjectById = async (projectNumber) => {
  try {
    const response = await axios.get(`${API_URL}/${projectNumber}`);
    return response.data;
  } catch (error) {
    console.error(`❌ API error - getProjectById (${projectNumber}):`, error);
    return null;
  }
};

export const createProject = async (project) => {
  try {
    const response = await axios.post(API_URL, project, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("❌ API error - createProject:", error);
    return null;
  }
};

export const updateProject = async (projectNumber, project) => {
  try {
    const response = await axios.put(`${API_URL}/${projectNumber}`, project, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(`❌ API error - updateProject (${projectNumber}):`, error);
    return null;
  }
};

export const deleteProject = async (projectNumber) => {
  try {
    await axios.delete(`${API_URL}/${projectNumber}`);
    return true;
  } catch (error) {
    console.error(`❌ API error - deleteProject (${projectNumber}):`, error);
    return false;
  }
};
