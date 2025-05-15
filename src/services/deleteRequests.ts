import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const deleteUser = async (token: string, user_id: string) => {
  return axios.delete(`${backendUrl}/users/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteWizard = async (token: string, wizard_id: string) => {
  return axios.delete(`${backendUrl}/warbands/wizards/${wizard_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteFollower = async (token: string, follower_id: string) => {
  return axios.delete(`${backendUrl}/warbands/followers/${follower_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteApprentice = async (
  token: string,
  apprentice_id: string
) => {
  return axios.delete(`${backendUrl}/warbands/apprentices/${apprentice_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
