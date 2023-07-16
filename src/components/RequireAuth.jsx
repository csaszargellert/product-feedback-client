import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth";

function RequireAuth() {
  const location = useLocation();
  const { user, accessToken } = useAuth();
  console.log(location);
  return user && accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
}

export default RequireAuth;
