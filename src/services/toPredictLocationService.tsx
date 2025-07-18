import axios from "axios";
import { API_BASE_URL } from "../constants/api";
const BASE_URL = `${API_BASE_URL}/admin/locations`;
export const createToPredictLocation = async (formData: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/`,
      formData
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error getting crop suggestion:", error);
    throw error;
  }
};

// Read all
export const getAllToPredictLocations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

// Read by ID
export const getToPredictLocationById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching location with ID ${id}:`, error);
    throw error;
  }
};

// Update
export const updateToPredictLocation = async (id: number, formData: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, formData);
    console.log("Updated location:", response);
    return response.data;
  } catch (error) {
    console.error(`Error updating location with ID ${id}:`, error);
    throw error;
  }
};

// Delete
export const deleteToPredictLocation = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    console.log(`Deleted location with ID ${id}`);
  } catch (error) {
    console.error(`Error deleting location with ID ${id}:`, error);
    throw error;
  }
};
