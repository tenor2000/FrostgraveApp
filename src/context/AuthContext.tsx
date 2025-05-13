import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {}, [user]);

  const logout = () => {
    setUser(null);
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
