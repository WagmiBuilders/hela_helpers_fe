import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

export const addMarketPrice = async (data: unknown) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/market-prices`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding market price:', error);
    throw error;
  }
};

export const getAllMarketPrice = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/market-prices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching market prices:', error);
    throw error;
  }
};

export const updateMarketPrice = async (id: number, data: unknown) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/market-prices/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating Market Price:', error);
    throw error;
  }
};


export const deleteMarketPrice = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/market-prices/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting market price:', error);
    throw error;
  }
};


export const getMarketPriceById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/market-prices/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Market price:', error);
    throw error;
  }
};

