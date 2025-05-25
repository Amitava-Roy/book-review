import apiClient from "../../config/axiosConfig";

export const register = async (reqBody) => {
  try {
    const response = await apiClient.post("/users/signUp", reqBody);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
