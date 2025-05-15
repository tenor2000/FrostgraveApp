import axios from "axios";

export default function deleteFollower(token: string, follower_id: string) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  axios.delete(`${backendUrl}/warbands/followers/${follower_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
