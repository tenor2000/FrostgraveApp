import axios from "axios";

export default function deleteWizard(token: string, apprentice_id: string) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return axios.delete(`${backendUrl}/warbands/apprentices/${apprentice_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
