import axios from "axios";
import type { User } from "../types/UserTypes";
import type { Wizard, Apprentice, Follower } from "../types/WarbandTypes";
import { getToken } from "./authToken";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const putUser = async (userData: User) => {
  return axios.put(`${backendUrl}/users/${userData._id}`, userData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const putWizard = async (wizardData: Wizard) => {
  return axios.put(
    `${backendUrl}/warbands/wizards/${wizardData._id}`,
    wizardData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const putApprentice = async (apprenticeData: Apprentice) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return axios.put(
    `${backendUrl}/warbands/apprentices/${apprenticeData._id}`,
    apprenticeData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const putFollower = async (followerData: Follower) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return axios.put(
    `${backendUrl}/warbands/followers/${followerData._id}`,
    followerData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};
