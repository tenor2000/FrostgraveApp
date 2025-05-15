import axios from "axios";

export default function deleteUser(token: string, user_id: string) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  axios.delete(`${backendUrl}/users/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
