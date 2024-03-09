import { useReducer, createContext, useContext } from "react";

// Combine contexts for better organization
const CartContext = createContext({
  state: [],
  dispatch: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          image: action.image,
          name: action.name,
          price: action.price,
          category: action.category,
          Stock: action.Stock, // Capitalize for consistency
          Quantity: 1, // Initialize quantity for new items
        },
      ];
    case "REMOVE":
      return state.filter((product) => product.id !== action.id);
    case "DROP":
      return [];
    case "UPDATE":
      return state.map((product) =>
        product.id === action.id
          ? {
              ...product,
              Quantity: action.Quantity, // Directly set new quantity
            }
          : product
      );
    default:
      console.log("Error in Reducer");
      return state; // Return state to prevent errors
  }
};

export const CartProvider = (prop) => {
  const { children } = prop;
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
