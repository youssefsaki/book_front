import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const { userData } = useUserContext();

  return userData ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
