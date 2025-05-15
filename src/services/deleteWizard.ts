import axios from "axios";

export default function deleteWizard(token: string, wizard_id: string) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return axios.delete(`${backendUrl}/warbands/wizards/${wizard_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
