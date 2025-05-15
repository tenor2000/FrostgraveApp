import { createContext, useContext, useEffect, useState } from "react";
import { fetchReferenceData } from "../services/fetchRequests";

const ReferenceDataContext = createContext();

export const ReferenceDataProvider = ({ children }) => {
  const [referenceData, setReferenceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching Reference Data...");
    fetchReferenceData()
      .then((res) => {
        setReferenceData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <ReferenceDataContext.Provider value={{ referenceData, loading, error }}>
      {children}
    </ReferenceDataContext.Provider>
  );
};

export const useReferenceData = () => {
  const context = useContext(ReferenceDataContext);
  if (!context) {
    throw new Error("useAuthData must be used within an AuthProvider");
  }
  return context;
};
