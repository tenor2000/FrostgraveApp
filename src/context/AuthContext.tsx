import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchUserData from "../services/fetchUserData";

export type User = {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  lastLogin: string;
  role: string;
  created: string;
  last_modified: string;
  profile: {
    bio: string;
    location: string;
    avatar: string;
  };
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  logout: () => void;
  error: any;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessTokenFG");
    if (token) {
      fetchUserData(token)
        .then((userData) => {
          setUser(userData);
        })
        .catch((err) => {
          console.error("Failed to fetch user with token:", err);
          localStorage.removeItem("accessTokenFG");
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthData = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthData must be used within an AuthProvider");
  }
  return context;
};
