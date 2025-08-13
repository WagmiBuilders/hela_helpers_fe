import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

export const getCropSuggestion = async (formData: unknown) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/public/suggestion/`, formData);
    console.log("response",response);
    return response.data;
  } catch (error) {
    console.error('Error getting crop suggestion:', error);
    throw error;
  }
};

export const getAllDistricts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/public/district/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

export const getAllSoilType = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/public/zone/soil-type`);
    return response.data;
  } catch (error) {
    console.error('Error fetching soil types:', error);
    throw error;
  }
};


