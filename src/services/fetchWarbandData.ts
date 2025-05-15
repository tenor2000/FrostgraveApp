import axios from "axios";

const fetchWarbandsData = async (token: string, user_id: string) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.get(`${backendUrl}/warbands/user/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const warbandData = response.data;
  console.log(warbandData);
  return warbandData;
};

export default fetchWarbandsData;
