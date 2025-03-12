/* eslint-disable react-refresh/only-export-components */
import { Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Login from "../views/auth/Login";
import LoginProtectedRoute from "./LoginProtectedRoute";
import Invoice from "../views/invoice/InvoiceIndex";
import Dashboard from "../views/dashboard/Dashboard";
import Product from "../views/product/Product";
import ProductCreate from "../views/product/ProductCreate";
import Category from "../views/category/Category";
import CategoryCreate from "../views/category/CategoryCreate";
import CategoryUpdate from "../views/category/CategoryUpdate";
import ProductUpdate from "../views/product/ProductUpdate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginProtectedRoute />,
    children: [
      {
        path: "",
        element: <Invoice />,
      },
    ],
  },
  {
    path: "product",
    element: <LoginProtectedRoute />,
    children: [
      {
        path: "",
        element: <Product />,
      },
      {
        path: "create/",
        element: <ProductCreate />,
      },
      {
        path: "update/:id",
        element: <ProductUpdate />,
      },
    ],
  },
  {
    path: "category",
    element: <LoginProtectedRoute />,
    children: [
      {
        path: "",
        element: <Category />,
      },
      {
        path: "create/",
        element: <CategoryCreate />,
      },
      {
        path: "update/:id",
        element: <CategoryUpdate />,
      },
    ],
  },
  {
    path: "Dashboard",
    element: <LoginProtectedRoute />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },

  {
    path: "login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
]);
