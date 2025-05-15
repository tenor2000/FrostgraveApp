import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/UserTypes";
import fetchUserData from "../services/fetchUserData";
import fetchWarbandData from "../services/fetchWarbandData";

type AuthContextType = {
  user: User | null;
  warbandData: any;
  setUser: (user: User | null) => void;
  loading: boolean;
  refreshData: () => void;
  logout: () => void;
  error: any;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [warbandData, setWarbandData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessTokenFG");

    const fetchData = async () => {
      try {
        const userData = await fetchUserData(token);
        setUser(userData);

        const warbandData = await fetchWarbandData(token, userData._id);
        console.log(warbandData);
        setWarbandData(warbandData);
      } catch (err) {
        console.error("Failed to fetch user with token:", err);
        localStorage.removeItem("accessTokenFG");
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [refresh]);

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

  const refreshData = () => {
    setRefresh(!refresh);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        warbandData,
        refreshData,
        loading,
        logout,
        error,
      }}
    >
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
