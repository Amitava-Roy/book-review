import apiClient from "../../config/axiosConfig";

export const login = async (reqBody) => {
  try {
    const response = await apiClient.post("/users/signIn", reqBody);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
