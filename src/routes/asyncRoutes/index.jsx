import { lazy } from "react";
const TasksRecord = lazy(() => import("../../pages/Tasks/record"));
const AddTasks = lazy(() => import("../../pages/Tasks/crud"));
const AboutPage = lazy(() => import("../../pages/AboutPage"));

export const asyncRoutes = [
  {
    path: "/about",
    href: "/about",
    exact: true,
    element: <AboutPage />,
    handle: {
      breadCrumb: [
        {
          title: "Home",
          path: "/",
          href: "/",
        },
        {
          title: "About us",
        },
      ],
    },
  },

  {
    path: "/tasks/record",
    href: "/tasks/record",
    exact: true,
    handle: {
      breadCrumb: [
        {
          title: "Home",
          path: "/",
          href: "/",
        },
        {
          title: "All Tasks",
        },
      ],
    },
    element: <TasksRecord />,
  },
  {
    path: "/tasks/add",
    href: "/tasks/add",
    exact: true,
    handle: {
      breadCrumb: [
        {
          title: "Home",
          path: "/",
          href: "/",
        },
        {
          title: "Add",
        },
      ],
    },
    element: <AddTasks />,
  },
];
