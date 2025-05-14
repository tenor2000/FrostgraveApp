import axios from "axios";
import type { User } from "../context/AuthContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getUserData = async (token: string) => {
  const response: User = await axios.get(`${backendUrl}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response;
};

export const loginAPI = async (username: string, password: string) => {
  const response = await axios.post(`${backendUrl}/auth/login`, {
    username,
    password,
  });
  console.log(response);
  return response;
};

export const registerAPI = async ({
  firstname,
  lastname,
  email,
  username,
  password,
}: {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}) => {
  const response = await axios.post(`${backendUrl}/auth/register`, {
    firstname,
    lastname,
    email,
    username,
    password,
  });
  console.log(response);
  return response;
};
