import axios from "axios";

const postRegister = async ({
  firstname,
  lastname,
  email,
  username,
  password,
}: {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await axios.post(`${backendUrl}/auth/register`, {
    firstname,
    lastname,
    email,
    username,
    password,
  });
  console.log(response);
  return response;
};

export default postRegister;
