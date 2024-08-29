import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // NestJS backend URL

export const sendMessage = async (queue, content) => {
  try {
    await axios.post(`${API_URL}/send-message`, { queue, content });
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
