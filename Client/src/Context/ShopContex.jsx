import { createContext } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (prop) => {
  //   const contextValue = "";
  return (
    <ShopContextProvider.Provider value={null}>
      {prop.children}
    </ShopContextProvider.Provider>
  );
};

export default ShopContextProvider;
