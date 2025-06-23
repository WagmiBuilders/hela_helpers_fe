import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

export const addCrop = async (cropName: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/crops`, {
      name: cropName,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding crop:', error);
    throw error;
  }
};

export const getAllCrops = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/crops`);
    return response.data;
  } catch (error) {
    console.error('Error fetching crops:', error);
    throw error;
  }
};

export const updateCrop = async (id: number, newName: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/crops/${id}`,
    {
      name: newName,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating crop:', error);
    throw error;
  }
};


export const deleteCrop = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/crops/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting crop:', error);
    throw error;
  }
};
