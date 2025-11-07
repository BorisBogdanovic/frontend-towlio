import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../app/store";
import { JSX } from "react";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <Navigate to="/login" replace />;

  if (!user.is_admin) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
