import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

function ProtectedRoute() {
  const { user, authChecked } = useSelector((state) => state.user);

  if (!authChecked) {
    return null; 
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

