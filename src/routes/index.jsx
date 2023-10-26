import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { asyncRoutes } from "./asyncRoutes";
const MainLayout = lazy(() => import("../components/AppBar"));
const HomePage = lazy(() => import("../pages/homePage"));
const NotFound = lazy(() => import("../pages/notFoundPage"));

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
]);
export default router;
