import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

export const addZone = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/zones`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding Zone:', error);
    throw error;
  }
};

export const getAllZones = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/zones`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Zones:', error);
    throw error;
  }
};

export const updateZone = async (id: number, data: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/zones/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating zone:', error);
    throw error;
  }
};

export const deleteZone = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/zones/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting zone:', error);
    throw error;
  }
};
