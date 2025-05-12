import axios from "axios";
// const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = "http://localhost:5050/api";

export const getReferenceData = async () => {
  const response = await axios.get(`${backendUrl}/reference/data`);
  console.log(response);
  return response;
};

export const getUserData = async () => {
  const response = await axios.get(`${backendUrl}/user/data`);
  console.log(response);
  return response;
};
