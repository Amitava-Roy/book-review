import apiClient from "../../config/axiosConfig";

export const getAllBooks = async () => {
  try {
    const response = await apiClient.get("/books");
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const addBook = async (token, reqBody) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await apiClient.post("/books", reqBody, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getOneBook = async (id) => {
  try {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
