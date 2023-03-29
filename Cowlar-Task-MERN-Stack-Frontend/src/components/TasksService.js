// tasks.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getAllTasks = async () => {
  try {
    const res = await axios.get(`${API_URL}/task`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/task/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (id, data) => {
  try {
    await axios.put(`${API_URL}/task/${id}`, data);
  } catch (error) {
    console.log(error);
  }
};

export const addTask = async (data) => {
  try {
    await axios.post(`${API_URL}/task`, data);
  } catch (error) {
    console.log(error);
  }
};
