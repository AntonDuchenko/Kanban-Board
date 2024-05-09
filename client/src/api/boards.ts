import axios from "axios";
import { BASE_URL } from "../variable";

export const getBoardsByUserId = async (userId: number) => {
  try {
    const response = await axios.get<Status[]>(`${BASE_URL}/boards/${userId}`);

    return response.data;
  } catch (error) {
    throw new Error("Unable to load boards");
  }
};

export const getBoardById = async (id: number) => {
  try {
    const response = await axios.get<Status>(`${BASE_URL}/boards/${id}`);

    return response.data;
  } catch (error) {
    throw new Error(`Unable to load board id ${id}`);
  }
};

export const createBoard = async (title: string, userId: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/boards`, { title, userId });

    return response.data;
  } catch (error) {
    throw new Error("Unable to create board");
  }
};

export const updateBoard = async (id: number, newTitle: string) => {
  try {
    const response = await axios.patch(`${BASE_URL}/boards/${id}`, newTitle);

    return response.data;
  } catch (error) {
    throw new Error("Unable to update board");
  }
};

export const deleteBoard = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/boards/${id}`);

    return response.data;
  } catch (error) {
    throw new Error("Unable to delete board");
  }
};
