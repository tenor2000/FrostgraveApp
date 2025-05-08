import { createContext, useContext, useEffect, useState } from "react";
import { getReferenceData } from "../services/apiConnect";

const ReferenceDataContext = createContext();

export const ReferenceDataProvider = ({ children }) => {
  const [referenceData, setReferenceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching Reference Data...");
    getReferenceData()
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

export const useReferenceData = () => useContext(ReferenceDataContext);
