import axios from "axios";
import { BASE_URL } from "../variable";

export const getTaskById = async (id: number) => {
  try {
    const respone = await axios.get<Task>(`${BASE_URL}/tasks/${id}`)

    return respone.data;
  } catch (error) {
    throw new Error(`Task with id:${id} not found`);
  }
};

export const getTasks = async () => {
  try {
    const response = await axios.get<Task[]>(`${BASE_URL}/tasks`);

    return response.data;
  } catch (error) {
    throw new Error("Unable to load tasks");
  }
};

export const createTask = async (taskInfo: Omit<Task, "id" | "status">) => {
  try {
    const respone = await axios.post(`${BASE_URL}/tasks`, taskInfo);

    return respone.data;
  } catch (error) {
    throw new Error("Unable to create task");
  }
};

export const deleteTask = async (id: number) => {
  try {
    const respone = await axios.delete(`${BASE_URL}/tasks/${id}`);

    return respone.data;
  } catch (error) {
    throw new Error("Unable to delete task");
  }
};

export const updateTask = async (id: number, data: Omit<Task, "id" | "status" | "statusId" | "actions">) => {
  try {
    const respone = await axios.patch(`${BASE_URL}/tasks/${id}`, data);

    return respone.data;
  } catch (error) {
    throw new Error("Unable to update task");
  }
};
