import axios from "axios";
import type { User } from "../types/UserTypes";

export default function putUser(token: string, userData: User) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return axios.put(`${backendUrl}/users/${userData._id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
