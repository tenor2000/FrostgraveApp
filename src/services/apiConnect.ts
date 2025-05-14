import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import type { Wizard } from "../pages/warbands/NewWizardForm";

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

export const postNewWizard = async (wizard: Wizard) => {
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
