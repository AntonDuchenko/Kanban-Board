import axios from "axios";
import { BASE_URL } from "../variable";

export const registration = async (email: string, password: string): Promise<User | string> => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    if (Array.isArray(error.response.data.message)) {

      return error.response.data.message[0];
    } else {

      return error.response.data.message;
    }
  }
};

export const login = async (email: string, password: string, isRemember: boolean): Promise<User | string> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
      isRemember,
    });

    return response.data;
  } catch (error: any) {
    if (Array.isArray(error.response.data.message)) {

      return error.response.data.message[0];
    } else {

      return error.response.data.message;
    }
  }
};
