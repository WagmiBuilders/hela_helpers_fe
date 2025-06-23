import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

export const getCropSuggestion = async (formData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/public/suggestion/`, {
      formData,
    });
    return response.data;
  } catch (error) {
    console.error('Error getting crop suggestion:', error);
    throw error;
  }
};