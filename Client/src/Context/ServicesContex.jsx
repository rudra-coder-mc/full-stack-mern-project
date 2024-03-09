import { createContext } from "react";

export const ServicesContex = createContext(null);

const ServicesContexProvider = (prop) => {
  const contextValue = "hii";
  return (
    <ServicesContex.Provider value={contextValue}>
      {prop.children}
    </ServicesContex.Provider>
  );
};

export default ServicesContexProvider;
