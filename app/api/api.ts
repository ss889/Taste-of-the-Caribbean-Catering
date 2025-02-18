import axios from 'axios';

const API_URL = 'https://clrc7u20bd.execute-api.us-east-1.amazonaws.com/ToC_lamda_function';  // Your actual API URL

// Function to fetch menu
const fetchMenu = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Return the data if the request is successful
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw new Error('Error fetching menu');
  }
};

export default fetchMenu;
