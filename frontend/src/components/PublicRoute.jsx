import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const PublicRoute = ({ children }) => {
  const { userData } = useUserContext();

  return userData ? <Navigate to="/" /> : children;
};

export default PublicRoute;
