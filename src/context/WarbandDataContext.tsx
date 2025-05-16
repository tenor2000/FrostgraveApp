import { createContext, useContext, useState } from "react";

const WarbandDataContext = createContext();

export const WarbandDataProvider = ({ children }) => {
  const [currentWizard, setCurrentWizard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <WarbandDataContext.Provider
      value={{ currentWizard, setCurrentWizard, loading, error }}
    >
      {children}
    </WarbandDataContext.Provider>
  );
};

export const useWarbandData = () => {
  const context = useContext(WarbandDataContext);
  if (!context) {
    throw new Error(
      "useWarbandData must be used within an WarbandDataProvider"
    );
  }
  return context;
};
