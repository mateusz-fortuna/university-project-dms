import { config } from "./config";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { RestrictedPage } from "../HOCs/RestrictedPage";
import { Documents } from "../pages/Documents";
import { LogIn } from "../pages/LogIn";

const { routes } = config;

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to={routes.documents} />,
  },
  { path: routes.login, element: <LogIn /> },
  {
    path: routes.documents,
    element: (
      <RestrictedPage>
        <Documents />
      </RestrictedPage>
    ),
  },
]);
