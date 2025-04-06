import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Dashboard from './Dashboard';
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import Home from "./components/Home";

import LoginAdmin from "./components/admin/Login";

import Login from "./components/user/Login";
import DashboardUser from './components/user/Dashboard';
import TrashCalculator from './components/user/TrashCalculator';
//import Withdraw from './components/user/Withdraw'; #Penarikan Tabungan;
import DepositHistory from "./components/user/DepositHistory";
import DepositHistoryDetail from "./components/user/DepositHistoryDetail";


import NotFound from "./components/NotFound";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/logout",
    element: <App />,
    children: [
      {
        path: "/logout",
        element: <Home />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <LoginAdmin />,
    children: [
      {
        path: "/admin/login",
        element: <LoginAdmin />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardUser />,
      },
      {
        path: "/dashboard/trash-calculator",
        element: <TrashCalculator />,
      },
      {
        path: "/dashboard/deposit-history",
        element: <DepositHistory />,
      },
      {
        path: "/dashboard/deposit-history/detail/:facturNo",
        element: <DepositHistoryDetail />,
      },
      {
        path: "*",
        element: <NotFound />
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/admin/dashboard",
        element: <DashboardUser />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <Record />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Record />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);