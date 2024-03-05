import { createContext } from "react";

export const ServicesContex = createContext(null);

const ServicesContexProvider = (prop) => {
  //   const contextValue = "";
  return (
    <ServicesContexProvider.Provider value={null}>
      {prop.children}
    </ServicesContexProvider.Provider>
  );
};

export default ServicesContexProvider;
