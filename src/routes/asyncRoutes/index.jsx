import { lazy } from "react";
const TasksRecord = lazy(() => import("../../pages/Tasks/record"));
const AllTasks = lazy(() => import("../../pages/Tasks/AllTasks"));
const AddTasks = lazy(() => import("../../pages/Tasks/crud"));

export const asyncRoutes = [
  // {
  //   path: "/tasks/record",
  //   href: "/tasks/record",
  //   exact: true,
  //   handle: {
  //     breadCrumb: [
  //       {
  //         title: "Home",
  //         path: "/",
  //         href: "/",
  //       },
  //       {
  //         title: "Record",
  //       },
  //     ],
  //   },
  //   element: <TasksRecord />,
  // },
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
];
