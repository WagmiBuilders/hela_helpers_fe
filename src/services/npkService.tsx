import axios from 'axios';
import { API_BASE_URL } from '../constants/api';


export const addNpkSchedule = async (data: unknown) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/npk-schedules`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding NPK Schedule:', error);
    throw error;
  }
};


export const getAllNpkSchedules = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/npk-schedules`);
    return response.data;
  } catch (error) {
    console.error('Error fetching npk schedules:', error);
    throw error;
  }
};

export const updateNpkSchedule = async (id: number, newData: unknown) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/npk-schedules/${id}`, newData);
    return response.data;
  } catch (error) {
    console.error('Error updating NPK schedule:', error);
    throw error;
  }
};

export const deleteNpkSchedule = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/npk-schedules/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting NPK Scgedule:', error);
    throw error;
  }
};

