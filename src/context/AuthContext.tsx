import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getUserData } from "../services/apiConnect";

type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  logout: () => void;
  error: any;
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching User Data...");
    const loadUser = async () => {
      try {
        const res = await axios.get("/api/user");
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    getUserData()
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserData = () => useContext(AuthContext);
