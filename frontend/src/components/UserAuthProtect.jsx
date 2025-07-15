import { Navigate, Outlet } from "react-router-dom";

const UserAuthProtect = () => {
  const isAuthenticated = localStorage.getItem("AdminDetails");
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default UserAuthProtect;