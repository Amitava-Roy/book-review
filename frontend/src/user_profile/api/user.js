import apiClient from "../../config/axiosConfig";

// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`users/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Update user details
export const updateUser = async (id, userDetails, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await apiClient.post(`users/${id}`, userDetails, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
