import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return "...Loading";
  }

  if (isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
  // outlet renders all the children nodes wrapped within the Protected routes tags
  // return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
