import axios from "axios";

const API_URL = "https://localhost:7007/api/services"; // Bas-URL för Service API

// Hämtar alla services
export const getServices = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ API error - getServices:", error);
    return [];
  }
};

// Hämtar en service baserat på ID
export const getServiceById = async (serviceId) => {
  try {
    const response = await axios.get(`${API_URL}/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error(`❌ API error - getServiceById (${serviceId}):`, error);
    return null;
  }
};

// Skapar en ny service
export const createService = async (service) => {
  try {
    const response = await axios.post(API_URL, service, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("❌ API error - createService:", error);
    return null;
  }
};

// Uppdaterar en service
export const updateService = async (serviceId, service) => {
  try {
    const response = await axios.put(`${API_URL}/${serviceId}`, service, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(`❌ API error - updateService (${serviceId}):`, error);
    return null;
  }
};

// Tar bort en service
export const deleteService = async (serviceId) => {
  try {
    await axios.delete(`${API_URL}/${serviceId}`);
    return true;
  } catch (error) {
    console.error(`❌ API error - deleteService (${serviceId}):`, error);
    return false;
  }
};
