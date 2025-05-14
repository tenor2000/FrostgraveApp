import axios from "axios";

const fetchUserData = async (token: string) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.get(`${backendUrl}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const userData = response.data[0];
  return userData;
};

export default fetchUserData;
