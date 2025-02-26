// projectService.js

import axios from "axios";

const API_URL = "https://localhost:7007/api"; // Bas-URL för API:et

export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error("❌ API error - getProjects:", error);
    return [];
  }
};

export const getProjectById = async (projectNumber) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectNumber}`);
    return response.data;
  } catch (error) {
    console.error(`❌ API error - getProjectById (${projectNumber}):`, error);
    return null;
  }
};

export const createProject = async (project) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, project, {
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
    const response = await axios.put(
      `${API_URL}/projects/${projectNumber}`,
      project,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`❌ API error - updateProject (${projectNumber}):`, error);
    return null;
  }
};

export const deleteProject = async (projectNumber) => {
  try {
    await axios.delete(`${API_URL}/projects/${projectNumber}`);
    return true;
  } catch (error) {
    console.error(`❌ API error - deleteProject (${projectNumber}):`, error);
    return false;
  }
};
