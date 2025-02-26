import axios from "axios";

const API_URL = "https://localhost:7007/api/statuses"; // Bas-URL för Status API

// Hämtar alla statusar
export const getStatuses = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("message");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API error - getStatuses:", error);
    return [];
  }
};

// Hämtar en status baserat på ID
export const getStatusById = async (statusId) => {
  try {
    const response = await axios.get(`${API_URL}/${statusId}`);
    return response.data;
  } catch (error) {
    console.error(`❌ API error - getStatusById (${statusId}):`, error);
    return null;
  }
};

// Skapar en ny status
export const createStatus = async (status) => {
  try {
    const response = await axios.post(API_URL, status, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("❌ API error - createStatus:", error);
    return null;
  }
};

// Uppdaterar en status
export const updateStatus = async (statusId, status) => {
  try {
    const response = await axios.put(`${API_URL}/${statusId}`, status, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(`❌ API error - updateStatus (${statusId}):`, error);
    return null;
  }
};

// Tar bort en status
export const deleteStatus = async (statusId) => {
  try {
    await axios.delete(`${API_URL}/${statusId}`);
    return true;
  } catch (error) {
    console.error(`❌ API error - deleteStatus (${statusId}):`, error);
    return false;
  }
};
