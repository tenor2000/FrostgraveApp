import axios from "axios";
import type { Follower } from "../types/WarbandTypes";

export default function putFollower(token: string, followerData: Follower) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return axios.put(
    `${backendUrl}/warbands/followers/${followerData._id}`,
    followerData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
