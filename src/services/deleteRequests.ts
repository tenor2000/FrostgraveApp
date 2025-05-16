import axios from "axios";
import { getToken } from "./authToken";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const deleteUser = async (user_id: string) => {
  return axios.delete(`${backendUrl}/users/${user_id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const deleteWizard = async (wizard_id: string) => {
  return axios.delete(`${backendUrl}/warbands/wizards/${wizard_id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const deleteFollower = async (follower_id: string) => {
  return axios.delete(`${backendUrl}/warbands/followers/${follower_id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const deleteApprentice = async (apprentice_id: string) => {
  console.log("Deleting apprentice:", apprentice_id);
  return axios.delete(`${backendUrl}/warbands/apprentices/${apprentice_id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
