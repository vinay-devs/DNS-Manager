import { Navigate, Outlet } from "react-router-dom";

const UnProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Outlet />;
  } else {
    return <Navigate to="/home" />;
  }
};

export default UnProtectedRoutes;
