import { config } from "../app.config";
import { RouteObject, Navigate } from "react-router-dom";
import { Documents } from "../pages/Documents";
import { Login } from "../pages/Login";

const { routes } = config;

export const loggedUserRoutes: RouteObject[] = [
  { path: "*", element: <Navigate to={routes.documents} /> },
  { path: routes.login, element: <Login /> },
  {
    path: routes.documents,
    element: <Documents />,
  },
];

export const guestRoutes: RouteObject[] = [
  { path: "*", element: <Navigate to={routes.login} /> },
  { path: routes.login, element: <Login /> },
];
