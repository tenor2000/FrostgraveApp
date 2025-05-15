import axios from "axios";
import type { Wizard } from "../types/WarbandTypes";

export default function putWizard(token: string, wizardData: Wizard) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return axios.put(
    `${backendUrl}/warbands/wizards/${wizardData._id}`,
    wizardData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
