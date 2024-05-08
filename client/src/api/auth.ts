import axios from 'axios';
import { BASE_URL } from '../variable';

export const registration = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}