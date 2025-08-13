import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

export const addCropVariety = async (data: unknown) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/varieties`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding crop variety:', error);
    throw error;
  }
};

export const getAllCropVarieties = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/varieties`);
    return response.data;
  } catch (error) {
    console.error('Error fetching crop varieties:', error);
    throw error;
  }
};

export const updateCropVarieties = async (id: number, data: unknown) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/varieties/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating crop variety:', error);
    throw error;
  }
};


export const deleteCropVariety = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/varieties/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting crop variety:', error);
    throw error;
  }
};


export const getCropVarietyById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/varieties/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching crop varietiy:', error);
    throw error;
  }
};
