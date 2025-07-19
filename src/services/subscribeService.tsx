import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

const BASE_URL = `${API_BASE_URL}/public/subscribed-users`;

// Create user
export const createSubscribedUser = async (formData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}`, formData);
    console.log("Created subscribed user:", response);
    return response.data;
  } catch (error) {
    console.error('Error creating subscribed user:', error);
    throw error;
  }
};

// Get all users
export const getAllSubscribedUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subscribed users:', error);
    throw error;
  }
};

// Get user by ID
export const getSubscribedUserById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching subscribed user with ID ${id}:`, error);
    throw error;
  }
};

// Update user
export const updateSubscribedUser = async (id: number, formData: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, formData);
    console.log("Updated subscribed user:", response);
    return response.data;
  } catch (error) {
    console.error(`Error updating subscribed user with ID ${id}:`, error);
    throw error;
  }
};

// Delete user
export const deleteSubscribedUser = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    console.log(`Deleted subscribed user with ID ${id}`);
  } catch (error) {
    console.error(`Error deleting subscribed user with ID ${id}:`, error);
    throw error;
  }
};

// Get user by phone number
export const getSubscribedUserByPhone = async (phoneNumber: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/phone/${encodeURIComponent(phoneNumber)}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching subscribed user by phone number ${phoneNumber}:`, error);
    throw error;
  }
};

// Send notification to users
// export const sendNotificationToUsers = async (message: string) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/send-notification`, { message });
//     console.log("Notification sent:", response);
//     return response.data;
//   } catch (error) {
//     console.error('Error sending notification:', error);
//     throw error;
//   }
// };

// Trigger predictions for all locations
export const triggerPredictionsForAllLocations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/weather/predict-all-locations`);
    console.log("Predictions triggered for all locations:", response);
    return response.data;
  } catch (error) {
    console.error('Error triggering predictions:', error);
    throw error;
  }
};
