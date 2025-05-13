import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthData } from "../../context/AuthContext";
import { loginAPI, getUserData } from "../../services/apiConnect";
import type { User } from "../../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuthData();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginAPI(username, password);
      console.log(res);

      localStorage.setItem("accessTokenFG", res.data.accessToken);

      const userData: User = await getUserData(res.data.accessToken);
      console.log(userData);
      setUser(userData);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
