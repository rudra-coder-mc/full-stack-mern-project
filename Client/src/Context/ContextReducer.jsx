import { createContext, useContext, useReducer } from "react";

// Combine contexts for better organization
const CartContext = createContext({
  state: [],
  dispatch: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // Ensure unique identifier (consider using UUID libraries)

      return [
        ...state,
        {
          id: action.id, // Use the generated id
          name: action.name,
          description: action.description,
          price: action.price,
          category: action.category,
          stock: action.stock, // Capitalize for consistency
          quantity: action.quantity, // Initialize quantity for new items
        },
      ];

    case "REMOVE":
      return state.filter((product) => product.id !== action.id); // Use strict comparison

    case "DROP":
      return [];

    case "UPDATE_QUANTITY": // Renamed for clarity
      // console.log(state);
      return state.map((product) =>
        parseInt(product.id) === parseInt(action.id)
          ? { ...product, quantity: action.quantity } // Update quantity directly
          : product
      );

    default:
      console.error("Error in Reducer:", action.type); // Improved error handling
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
