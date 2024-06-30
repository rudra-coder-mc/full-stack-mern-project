import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const isAuthenticated = useSelector((state) => state.Auth.status);

  const role = useSelector((state) => state.Auth.userData.role);
  const isAdmin = role == "admin";
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
