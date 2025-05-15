import axios from "axios";
import type { User } from "../types/UserTypes";
import type { Wizard, Apprentice, Follower } from "../types/WarbandTypes";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const putUser = async (token: string, userData: User) => {
  return axios.put(`${backendUrl}/users/${userData._id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putWizard = async (token: string, wizardData: Wizard) => {
  return axios.put(
    `${backendUrl}/warbands/wizards/${wizardData._id}`,
    wizardData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const putApprentice = async (token: string, apprenticeData: Apprentice) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return axios.put(
    `${backendUrl}/warbands/apprentices/${apprenticeData._id}`,
    apprenticeData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const putFollower = async (token: string, followerData: Follower) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return axios.put(
    `${backendUrl}/warbands/followers/${followerData._id}`,
    followerData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
