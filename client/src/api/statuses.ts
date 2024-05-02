import axios from "axios";
import { BASE_URL } from "../variable";

export const getStatusById = async (id: number) => {
  try {
    const response = await axios.get<Status>(`${BASE_URL}/statuses/${id}`);

    return response.data;
  } catch (error) {
    throw new Error("Unable to get status by id");
  }
};

export const getStatusesByBoardId = async (boardId: number) => {
  try {
    const response = await axios.get<Status[]>(
      `${BASE_URL}/statuses/board/${boardId}`
    );

    return response.data;
  } catch (error) {
    throw new Error("Unable to get statuses");
  }
}

export const getStatuses = async () => {
  try {
    const response = await axios.get<Status[]>(`${BASE_URL}/statuses`);

    return response.data;
  } catch (error) {
    throw new Error("Unable to load statuses");
  }
};

export const deleteStatus = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/statuses/${id}`);
  } catch (error) {
    throw new Error("Unable to delete status");
  }
};

export const createStatus = async (title: string, boardId: number) => {
  try {
    const response = await axios.post<Status>(`${BASE_URL}/statuses`, {
      title,
      boardId,
    });

    return response.data;
  } catch (error) {
    throw new Error("Unable to create status");
  }
};

export const updateStatus = async (id: number, newTitle: string) => {
  try {
    const response = await axios.patch<Status>(`${BASE_URL}/statuses/${id}`, {
      title: newTitle,
    });

    return response.data;
  } catch (error) {
    throw new Error("Unadle to update status");
  }
};
