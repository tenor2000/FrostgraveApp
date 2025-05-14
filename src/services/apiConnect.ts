import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getReferenceData = async () => {
  const response = await axios.get(`${backendUrl}/reference/data`);
  console.log(response);
  return response;
};

// export const getWarbandData = async () => {
//   const response = await axios.get(`${backendUrl}/warbands/data`);
//   console.log(response);
//   return response;
// };
