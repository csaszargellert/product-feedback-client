import {
  Outlet,
  Navigate,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom";

function RequireAuth() {
  const { userIsAuthenticated } = useRouteLoaderData("root");
  const location = useLocation();

  return userIsAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
}

export default RequireAuth;
