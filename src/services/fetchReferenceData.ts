import axios from "axios";

const fetchReferenceData = async () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.get(`${backendUrl}/reference/data`);
  console.log(response);
  return response;
};

export default fetchReferenceData;
