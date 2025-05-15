import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchReferenceData = async () => {
  const response = await axios.get(`${backendUrl}/reference/data`);
  // console.log(response);
  return response;
};

export const fetchUserData = async (token: string) => {
  const response = await axios.get(`${backendUrl}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const userData = response.data[0];
  return userData;
};

export const fetchWarbandsData = async (token: string, user_id: string) => {
  const response = await axios.get(`${backendUrl}/warbands/user/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const warbandData = response.data;
  console.log(warbandData);
  return warbandData;
};
