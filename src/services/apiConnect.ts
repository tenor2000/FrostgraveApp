import axios from "axios";
import type { User } from "../context/AuthContext";
const backendUrl = "http://localhost:5050/api";

export const getReferenceData = async () => {
  const response = await axios.get(`${backendUrl}/reference/data`);
  console.log(response);
  return response;
};

// export const getWarbandData = async () => {
//   const response = await axios.get(`${backendUrl}/warbands/data`);
//   console.log(response);
//   return response;
// };

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
