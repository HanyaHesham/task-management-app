import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { asyncRoutes } from "./asyncRoutes";
const MainLayout = lazy(() => import("../components/AppBar"));
const HomePage = lazy(() => import("../pages/HomePage"));
const NotFound = lazy(() => import("../pages/notFoundPage"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        href: "/",
        exact: true,
        element: <HomePage />,
      },
      ...asyncRoutes,
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default router;
