import axios from "axios";
import type { Apprentice } from "../types/WarbandTypes";

export default function putApprentice(
  token: string,
  apprenticeData: Apprentice
) {
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
}
