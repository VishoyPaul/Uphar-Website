import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchEyewear = async () => {
  try {
    const response = await axios.get('/eyewear');
    return response.data;
  } catch (error) {
    console.error('Error fetching eyewear:', error);
    throw error;
  }
}