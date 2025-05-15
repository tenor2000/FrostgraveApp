import axios from "axios";
import getToken from "./authToken";
import type { WizardCreation } from "../types/WarbandTypes";
import type { UserCreation } from "../types/UserTypes";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const postLogin = async (username: string, password: string) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.post(`${backendUrl}/auth/login`, {
    username,
    password,
  });

  return response;
};

export const postNewWizard = async (wizard: WizardCreation) => {
  if (wizard.user_id !== "LocalStorage") {
    try {
      const response = await axios.post(
        `${backendUrl}/warbands/wizards`,
        wizard,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      console.error(err);
    }
  } else {
    try {
      localStorage.setItem("wizardFG", JSON.stringify(wizard));
      console.log("Saved to localStorage");
      return wizard;
    } catch (err: any) {
      console.error(err);
    }
  }
};

export const postRegister = async (userData: UserCreation) => {
  const response = await axios.post(`${backendUrl}/auth/register`, userData);
  // console.log(response);
  return response;
};
