import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const getToken = () => localStorage.getItem('token');

export const searchMasterProducts = async (category, term) => {
  const token = getToken();
  if (!token) {
    throw new Error('No authentication token found.');
  }

  try {
    const response = await apiClient.get('/master-products/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        category,
        term,
      },
    });
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching master products:", error);
    throw error;
  }
};