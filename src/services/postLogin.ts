import axios from "axios";

const postLogin = async (username: string, password: string) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.post(`${backendUrl}/auth/login`, {
    username,
    password,
  });
  console.log(response);
  return response;
};

export default postLogin;
