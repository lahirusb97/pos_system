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
import InvoiceTable from "../views/invoice/InvoiceTable";
import InvoiceView from "../views/invoice/InvoiceView";
import UserIndex from "../views/user/UserIndex";
import PaymentIndex from "../views/payment/PaymentIndex";
import PaymentForm from "../views/payment/PaymentForm";
import RepairIndex from "../views/repair/RepairIndex";
import RepairEdit from "../views/repair/RepairEdit";
import RepairCreate from "../views/repair/RepairCreate";
import RepairInvoice from "../views/repair/RepairInvoice";
import RepairPayment from "../views/repair/RepairPayment";
import CustomerIndex from "../views/customer/CustomerIndex";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginProtectedRoute />,
    children: [
      {
        index: true,
        path: "",
        element: <Invoice />,
      },
      {
        path: "all",
        element: <InvoiceTable />,
      },
      {
        path: "view/:id",
        element: <InvoiceView />,
      },
    ],
  },
  {
    path: "/payment",
    element: <LoginProtectedRoute />,
    children: [
      {
        index: true,
        path: "",
        element: <PaymentIndex />,
      },
      {
        path: ":id",
        element: <PaymentForm />,
      },
    ],
  },
  {
    path: "/repair",
    element: <LoginProtectedRoute />,
    children: [
      {
        index: true,
        path: "",
        element: <RepairIndex />,
      },
      {
        path: ":id",
        element: <RepairEdit />,
      },
      {
        path: ":id/invoice",
        element: <RepairInvoice />,
      },
      {
        path: "create",
        element: <RepairCreate />,
      },
      {
        path: ":id/payment",
        element: <RepairPayment />,
      },
    ],
  },
  {
    path: "/users",
    element: <LoginProtectedRoute />,
    children: [
      {
        index: true,

        path: "",
        element: <UserIndex />,
      },
    ],
  },
  {
    path: "/customer",
    element: <LoginProtectedRoute />,
    children: [
      {
        index: true,

        path: "",
        element: <CustomerIndex />,
      },
    ],
  },
  {
    path: "product",
    element: <LoginProtectedRoute />,
    children: [
      {
        index: true,

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
        index: true,

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
        index: true,

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
