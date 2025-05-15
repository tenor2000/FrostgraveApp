import axios from "axios";
import type { WizardCreation } from "../types/WarbandTypes";

export const postNewWizard = async (wizard: WizardCreation) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (wizard.user_id !== "LocalStorage") {
    try {
      const response = await axios.post(
        `${backendUrl}/warbands/wizards`,
        wizard
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
