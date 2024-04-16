import { DefaultLayout } from "@components";

import { AppPage } from "@pages";

import { RouteObject } from "react-router";
import { createBrowserRouter } from "react-router-dom";

const routers: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <AppPage />,
      },
    ],
  },
];

export const Routers = createBrowserRouter(routers);
