import React from "react";
import { Navigate, Outlet } from "react-router";
// import NavBar from "../view/navbar/NavBar";
import { Box } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
import NavBar from "../component/NavBar";

const LoginProtectedRoute: React.FC = () => {
  const { user } = useAuthContext();

  return user ? (
    <div>
      <NavBar />
      <Box>
        <Outlet />
      </Box>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default LoginProtectedRoute;
