import { lazy } from "react";
const TasksRecord = lazy(() => import("../../pages/tasks/record"));
const AddTasks = lazy(() => import("../../pages/tasks/crud"));
const AboutPage = lazy(() => import("../../pages/aboutPage"));

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
