import axios from "axios";
import type { UserCreation } from "../types/UserTypes";

const postRegister = async (userData: UserCreation) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.post(`${backendUrl}/auth/register`, userData);
  console.log(response);
  return response;
};

export default postRegister;
