import React from "react";
import { Navigate, Outlet } from "react-router";
// import NavBar from "../view/navbar/NavBar";
import { Box } from "@mui/material";
import NavBar from "../component/NavBar";
import { getFromLocalStorage } from "../util/authDataConver";

const LoginProtectedRoute: React.FC = () => {
  const user = getFromLocalStorage();

  return user?.token ? (
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
