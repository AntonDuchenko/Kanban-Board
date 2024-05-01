import axios from "axios";
import { BASE_URL } from "../variable";

export const getBoardById = async (id: number) => {
  try {
    const response = await axios.get<Board>(`${BASE_URL}/statuses/${id}`);

    return response.data;
  } catch (error) {
    throw new Error("Unable to get ");
  }
}

export const getBoards = async () => {
  try {
    const response = await axios.get<Board[]>(`${BASE_URL}/statuses`);

    return response.data;
  } catch (error) {
    throw new Error("Unable to load boards");
  }
};

export const deleteBoard = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/statuses/${id}`);
  } catch (error) {
    throw new Error("Unable to delete board");
  }
};

export const createBoard = async (title: string) => {
  try {
    const response = await axios.post<Board>(`${BASE_URL}/statuses`, {
      title,
    });

    return response.data;
  } catch (error) {
    throw new Error("Unable to create board");
  }
};

export const updateBoard = async (id: number, newTitle: string) => {
  try {
    const response = await axios.patch<Board>(`${BASE_URL}/statuses/${id}`, {
      title: newTitle,
    })

    return response.data;
  } catch (error) {
    throw new Error("Unadle to update board");
    
  }
};
