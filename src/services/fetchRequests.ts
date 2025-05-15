import axios from "axios";
import { getToken } from "./authToken";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchReferenceData = async () => {
  const response = await axios.get(`${backendUrl}/reference/data`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  // console.log(response);
  return response;
};

export const fetchUserData = async () => {
  const response = await axios.get(`${backendUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const userData = response.data;
  // console.log(userData);
  return userData;
};

export const fetchWarbandsData = async (user_id: string) => {
  const response = await axios.get(`${backendUrl}/warbands/user/${user_id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const warbandData = response.data;
  // console.log(warbandData);
  return warbandData;
};
