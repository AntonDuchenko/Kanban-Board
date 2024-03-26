import axios from 'axios';
import { BASE_URL } from '../variable';

export const getHistory = async () => {
  try {
    const response = await axios.get<Action[]>(`${BASE_URL}/history`);

    return response.data;
  } catch (error) {
    throw new Error("Unable to load history");
  }
}

export const getHistoryByTaskId = async (id: number) => {
  try {
    const response = await axios.get<Action[]>(`${BASE_URL}/history/${id}`);

    return response.data;
  } catch (error) {
    throw new Error(`Unable to load history of task id ${id}`);
  }
}

export const createHistory = async (taskId: number, data: Action) => {
  try {
    const response = await axios.post(`${BASE_URL}/history/${taskId}`, data);

    return response.data;
  } catch (error) {
    throw new Error("Unable to create history");
    
  }
}