import { createContext } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (prop) => {
  const contextValue = "";
  return (
    <ShopContext.Provider value={contextValue}>
      {prop.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
