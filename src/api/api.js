import axios from 'axios';
import UseAuth from '../hooks/useAuth';
// Définir l'URL de base pour les appels API


const API_BASE_URL = 'http://localhost:5000';
export const fetchEmployeeLeaves = async (token) => {
  try {
    console.log('Fetching data with token:', token);

    const response = await fetch(`${API_BASE_URL}/employees-leaves/employee`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data received from API:', data);
    return data; // Ensure this is an array of leave objects
  } catch (error) {
    console.error('Error fetching employee leaves:', error);
    throw error;
  }
};


// Fonction pour obtenir les employés de l'équipe d'un chef d'équipe
export const getTeamLeaves = async (teamLeadId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/leaves/team/${teamLeadId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team leaves:', error);
    throw error;
  }
};
