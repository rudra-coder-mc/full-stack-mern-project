import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Replace with your actual authentication check using a state management library, context, or custom logic
  const isAuthenticated = localStorage.getItem("token") !== null; // Example using a token
  const isAdmin = localStorage.getItem("role") == "admin"; // Example using a token
  // console.log(isAdmin);
  // console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAuthenticated && !isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
