import { lazy } from "react";
const AllTasks = lazy(() => import("../../pages/Tasks/AllTasks"));
const AddTasks = lazy(() => import("../../pages/Tasks/Crud"));
const ViewTask = lazy(() => import("../../pages/Tasks/ViewTask"));

export const asyncRoutes = [
  {
    path: "/tasks/all-tasks",
    href: "/tasks/all-tasks",
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
    element: <AllTasks />,
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
  {
    path: "/tasks/view/:id",
    href: "/tasks/view/:id",
    exact: true,
    handle: {
      breadCrumb: [
        {
          title: "Home",
          path: "/",
          href: "/",
        },
        {
          title: "View",
        },
      ],
    },
    element: <ViewTask />,
  },
];
